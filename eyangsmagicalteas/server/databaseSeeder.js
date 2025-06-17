// defines API endpoints that can be called via HTTP requests. used w postman

import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import ProductAttribute from './models/ProductAttribute.js';
import ProductVariant from './models/ProductVariant.js';

// Import user data
import users from './data/Users.js';

const router = express.Router();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read the products data
const readProductsData = () => {
  const productsFilePath = path.join(__dirname, 'data/Products.js');
  const fileContent = fs.readFileSync(productsFilePath, 'utf8');
  
  // Extract the products array from the file content
  const productsMatch = fileContent.match(/const products = (\[[\s\S]*?\]);/);
  if (!productsMatch) {
    throw new Error('Could not find products array in Products.js');
  }
  
  // Evaluate the array string to get the actual array
  const productsArray = eval(productsMatch[1]);
  return productsArray;
};

// Function to read the categories data
const readCategoriesData = () => {
  return [
    {
      name: "Magic Tea Leaves",
      slug: "magic-tea-leaves",
      description: "Our finest selection of tea blends for every magical purpose."
    },
    {
      name: "Enchanted Tea Pots",
      slug: "tea-pots",
      description: "Magical tea pots for enhancing the brewing experience."
    },
    {
      name: "Magic Tea Bags",
      slug: "magic-tea-bags", // Fixed slug to match Products.js
      description: "Pre-packaged magic tea bags for convenience."
    },
    {
      name: "Best Sellers",
      slug: "best-sellers",
      description: "Our most popular magical products."
    }
  ];
};

// POST endpoint to seed users
router.post("/users", async (req, res) => {
  try {
    // Drop users collection to remove old indexes
    try {
      await mongoose.connection.dropCollection('users');
    } catch (error) {
      // Collection might not exist yet, which is fine
      console.log('Note: Users collection may not have existed yet');
    }
    
    // Create users
    const createdUsers = await User.create(users);
    
    res.status(200).json({
      success: true,
      message: `Created ${createdUsers.length} users`,
      data: createdUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding users',
      error: error.message
    });
  }
});

// POST endpoint to seed products with new schema
router.post("/products", async (req, res) => {
  try {
    // Drop collections to remove old indexes
    try {
      await Promise.all([
        mongoose.connection.dropCollection('categories'),
        mongoose.connection.dropCollection('products'),
        mongoose.connection.dropCollection('productattributes'),
        mongoose.connection.dropCollection('productvariants')
      ]);
    } catch (error) {
      // Collections might not exist yet, which is fine
      console.log('Note: Some collections may not have existed yet');
    }
    
    // Create categories
    const categoriesData = readCategoriesData();
    const categories = await Category.create(categoriesData);
    
    // Create a map of category slugs to their IDs for easy lookup
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.slug] = category._id;
    });
    
    // Create the "Size" product attribute
    const sizeAttribute = await ProductAttribute.create({
      name: 'Size',
      values: ['50mg', '100mg', '200mg', '100ml', '250ml', '500ml', 'Box of 5', 'Box of 10', 'Box of 15', 'Box of 20', 'Box of 30']
    });
    
    // Read products data
    const productsData = readProductsData();
    
    const createdProducts = [];
    const createdVariants = [];
    
    // Process each product
    for (const productData of productsData) {
      // Map category strings to category IDs
      const categoryIds = productData.category.map(categorySlug => {
        const categoryId = categoryMap[categorySlug];
        if (!categoryId) {
          console.warn(`Warning: Category '${categorySlug}' not found for product '${productData.name}'`);
        }
        return categoryId;
      }).filter(Boolean); // Remove any undefined values
      
      // Create the product
      const product = await Product.create({
        name: productData.name,
        description: productData.desc,
        image: productData.cover, // Map cover to image
        categories: categoryIds,
        featured: productData.category.includes('best-sellers')
      });
      createdProducts.push(product);
      
      // Create variants for each size
      for (const sizeData of productData.sizes) {
        const variant = await ProductVariant.create({
          product: product._id,
          attributes: [{
            attribute: sizeAttribute._id,
            value: sizeData.name
          }],
          price: sizeData.price,
          stock: sizeData.stock,
          sku: `${productData.id}-${sizeData.name.replace(/\s+/g, '')}`
        });
        createdVariants.push(variant);
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Created ${categories.length} categories, ${createdProducts.length} products, and ${createdVariants.length} variants`,
      data: {
        categories,
        products: createdProducts,
        variants: createdVariants.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding products',
      error: error.message
    });
  }
});

// GET endpoint to retrieve all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password'); // Exclude passwords for security
    res.status(200).json({
      success: true,
      count: allUsers.length,
      data: allUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

export default router;
