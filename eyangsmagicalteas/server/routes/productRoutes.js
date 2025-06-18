import express from 'express';
import Product from '../models/Product.js';
import ProductVariant from '../models/ProductVariant.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET ALL PRODUCTS with their variants
router.get("/", async (req, res) => {
  const categorySlug = req.query.category;
  try {
    let query = {};
    
    // If a category slug is provided, find the category ID first
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) {
        query.categories = category._id;
      } else {
        return res.status(404).json({ message: `Category '${categorySlug}' not found` });
      }
    }
    
    // Find products matching the query
    const products = await Product.find(query).populate('categories');

    let processedProducts = [...products]; // Create a mutable copy to potentially slice

    // If fetching best-sellers and there are more than 3, randomly select 3
    if (categorySlug === 'best-sellers' && processedProducts.length > 3) {
      // Fisher-Yates (Knuth) Shuffle
      for (let i = processedProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [processedProducts[i], processedProducts[j]] = [processedProducts[j], processedProducts[i]];
      }
      processedProducts = processedProducts.slice(0, 3);
    }
    
    // For each product (or the selected subset), find its variants
    const productsWithVariants = await Promise.all(processedProducts.map(async (product) => {
      const variants = await ProductVariant.find({ product: product._id })
        .populate('attributes.attribute');
      
      // Convert to a plain object so we can add the variants
      const productObj = product.toObject();
      productObj.variants = variants;
      
      return productObj;
    }));
    
    res.status(200).json(productsWithVariants);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// Search products endpoint - implements AND search logic using MongoDB aggregation
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    // If search query is empty or just spaces, return an empty array
    if (!q || q.trim() === '') {
      return res.status(200).json([]);
    }

    // Split the search query into terms for AND search
    const searchTerms = q.trim().split(/\s+/).filter(term => term.length > 0);

    // If there are no valid search terms, return an empty array
    if (searchTerms.length === 0) {
      return res.status(200).json([]);
    }

    // For each search term, create a set of OR conditions to search across fields
    const matchConditions = searchTerms.map(term => ({
      $or: [
        { name: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { 'categories.name': { $regex: term, $options: 'i' } },
        { 'variants.name': { $regex: term, $options: 'i' } },
      ],
    }));

    const pipeline = [
      // Join with the categories collection
      {
        $lookup: {
          from: 'categories', // The actual collection name for the Category model
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
        },
      },
      // Join with the productvariants collection
      {
        $lookup: {
          from: 'productvariants', // The actual collection name for the ProductVariant model
          localField: '_id',
          foreignField: 'product',
          as: 'variants',
        },
      },
      // Filter based on the search terms (AND logic)
      {
        $match: {
          $and: matchConditions,
        },
      },
    ];

    const products = await Product.aggregate(pipeline);

    res.status(200).json(products);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ message: 'Error searching products', error: err.message });
  }
});

// GET SINGLE PRODUCT with its variants
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find variants for this product
    const variants = await ProductVariant.find({ product: product._id })
      .populate('attributes.attribute');
    
    // Convert to a plain object so we can add the variants
    const productObj = product.toObject();
    productObj.variants = variants;
    
    res.status(200).json(productObj);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

export default router;
