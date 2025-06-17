import express from 'express';
import Product from '../models/Product.js';
import ProductVariant from '../models/ProductVariant.js';
import Category from '../models/Category.js';

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
    
    // For each product, find its variants
    const productsWithVariants = await Promise.all(products.map(async (product) => {
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
