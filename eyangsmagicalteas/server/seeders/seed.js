import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import models
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import ProductAttribute from '../models/ProductAttribute.js';
import ProductVariant from '../models/ProductVariant.js';

// Configure environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read the products data
const readProductsData = () => {
  const productsFilePath = path.join(__dirname, '../data/Products.js');
  const fileContent = fs.readFileSync(productsFilePath, 'utf8');
  
  // Extract the products array from the file content
  // This is a simple approach; in a production environment, you might want to use a more robust method
  const productsMatch = fileContent.match(/const products = (\[[\s\S]*?\]);/);
  if (!productsMatch) {
    throw new Error('Could not find products array in Products.js');
  }
  
  // Evaluate the array string to get the actual array
  // Note: Using eval is generally not recommended for security reasons,
  // but in this controlled environment for seeding data, it's acceptable
  const productsArray = eval(productsMatch[1]);
  return productsArray;
};

// Function to read the categories data
const readCategoriesData = () => {
  // Define the categories based on the data.js file
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
      slug: "tea-bags",
      description: "Pre-packaged magic tea bags for convenience."
    },
    {
      name: "Best Sellers",
      slug: "best-sellers",
      description: "Our most popular magical products."
    }
  ];
};

// Main seeding function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      ProductAttribute.deleteMany({}),
      ProductVariant.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create categories
    const categoriesData = readCategoriesData();
    const categories = await Category.create(categoriesData);
    console.log(`Created ${categories.length} categories`);

    // Create a map of category slugs to their IDs for easy lookup
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.slug] = category._id;
    });

    // Create the "Size" product attribute
    const sizeAttribute = await ProductAttribute.create({
      name: 'Size',
      values: ['50mg', '100mg', '200mg', '100ml', '250ml', '500ml', '10 bags', '20 bags', '30 bags']
    });
    console.log('Created Size product attribute');

    // Read products data
    const productsData = readProductsData();

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
      console.log(`Created product: ${product.name}`);

      // Create variants for each size
      for (const sizeData of productData.sizes) {
        await ProductVariant.create({
          product: product._id,
          attributes: [{
            attribute: sizeAttribute._id,
            value: sizeData.name
          }],
          price: sizeData.price,
          stock: sizeData.stock,
          sku: `${productData.id}-${sizeData.name.replace(/\s+/g, '')}`
        });
      }
      console.log(`Created ${productData.sizes.length} variants for ${product.name}`);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seeding function
seedDatabase();
