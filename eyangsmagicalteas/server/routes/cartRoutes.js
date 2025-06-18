import express from 'express';
import ShoppingCart from '../models/ShoppingCart.js';
import ProductVariant from '../models/ProductVariant.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// NEW ENDPOINT: Initiate a new session and get a unique ID
router.get('/session/new', (req, res) => {
  try {
    const newSessionId = uuidv4();
    res.json({ sessionId: newSessionId });
  } catch (error) {
    console.error('Error initiating session:', error);
    res.status(500).json({ message: 'Error initiating session', error: error.message });
  }
});

/**

/**
 * Get a cart by sessionId
 * GET /api/cart/:sessionId
 */
router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Find cart by sessionId
    let cart = await ShoppingCart.findOne({ sessionId })
      .populate({
        path: 'items.productVariant',
        populate: [
          {
            path: 'product',
            select: 'name image'
          },
          {
            path: 'attributes.attribute',
            model: 'ProductAttribute'
          }
        ]
      });
    
    // If no cart exists for this session, return null.
    // The client or the add item endpoint will handle creation if necessary.
    if (!cart) {
      return res.status(200).json(null); // Or res.status(404).json({ message: 'Cart not found' });
    }

    /*
    // Detailed logging for debugging population
    if (cart && cart.items && cart.items.length > 0) {
      const firstItem = cart.items[0];
      if (firstItem && firstItem.productVariant && firstItem.productVariant.attributes && firstItem.productVariant.attributes.length > 0) {
        console.log('\n--- Server-Side Cart Item Debug ---');
        console.log('Session ID:', sessionId);
        console.log('Populated cart.items[0].productVariant._id:', firstItem.productVariant._id);
        console.log('Populated cart.items[0].productVariant.attributes:', JSON.stringify(firstItem.productVariant.attributes, null, 2));
        firstItem.productVariant.attributes.forEach((attr, index) => {
          console.log(`  Attribute ${index}:`);
          console.log(`    attr.value: ${attr.value}`);
          console.log(`    typeof attr.attribute: ${typeof attr.attribute}`);
          if (attr.attribute) {
            console.log(`    attr.attribute instanceof mongoose.Types.ObjectId: ${attr.attribute instanceof mongoose.Types.ObjectId}`);
            console.log(`    attr.attribute (raw): ${JSON.stringify(attr.attribute)}`);
            console.log(`    attr.attribute.name (expected if populated): ${attr.attribute.name}`);
          }
        });
        console.log('--- End Server-Side Cart Item Debug ---\n');
      }
    }
    */
    
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

/**
 * Add item to cart
 * POST /api/cart/:sessionId/items
 * Body: { productVariantId, quantity }
 */
router.post('/:sessionId/items', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { productVariantId, quantity } = req.body;
    
    // Validate input
    if (!productVariantId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Product variant ID and quantity (minimum 1) are required' });
    }
    
    // Find the product variant to get its price
    const productVariant = await ProductVariant.findById(productVariantId).populate('product', 'name image');
    if (!productVariant) {
      return res.status(404).json({ message: 'Product variant not found' });
    }

    // Backend Stock Check
    if (productVariant.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available for the requested quantity.' });
    }
    
    // Find cart by sessionId or create a new one atomically using findOneAndUpdate
    let cart = await ShoppingCart.findOneAndUpdate(
      { sessionId }, // Query to find the cart
      {
        $setOnInsert: { // Fields to set only if a new document is created (upserted)
          sessionId,
          items: [],
          totalAmount: 0,
          lastUpdated: new Date() // Initialize lastUpdated on creation
        }
      },
      {
        new: true,        // Return the modified document (or the new one if upserted)
        upsert: true,     // Create the document if it doesn't exist
        setDefaultsOnInsert: true // Apply schema defaults if a new document is created
      }
    );
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productVariant.toString() === productVariantId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (productVariant.stock < newQuantity) {
        return res.status(400).json({ message: 'Not enough stock available to increase quantity.' });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item if it doesn't exist (initial stock check for 'quantity' already done)
      cart.items.push({
        productVariant: productVariantId,
        quantity,
        price: productVariant.price
      });
    }
    
    // Update cart total and save
    cart.calculateTotal();
    await cart.save();
    
    // Return updated cart with populated product info
    const updatedCart = await ShoppingCart.findById(cart._id)
      .populate({
        path: 'items.productVariant',
        populate: [
          {
            path: 'product',
            select: 'name image'
          },
          {
            path: 'attributes.attribute',
            model: 'ProductAttribute'
          }
        ]
      });
    
    res.json(updatedCart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

/**
 * Update item quantity in cart
 * PUT /api/cart/:sessionId/items/:productVariantId
 * Body: { quantity }
 */
router.put('/:sessionId/items/:productVariantId', async (req, res) => {
  try {
    const { sessionId, productVariantId } = req.params;
    const { quantity } = req.body;
    
    // Validate input
    if (!quantity || quantity < 0) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }
    
    // Find cart by sessionId
    const cart = await ShoppingCart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      item => item.productVariant.toString() === productVariantId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    // Update cart total and save
    cart.calculateTotal();
    await cart.save();
    
    // Return updated cart with populated product info
    const updatedCart = await ShoppingCart.findById(cart._id)
      .populate({
        path: 'items.productVariant',
        populate: [
          {
            path: 'product',
            select: 'name image'
          },
          {
            path: 'attributes.attribute',
            model: 'ProductAttribute'
          }
        ]
      });
    
    res.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
});

/**
 * Remove item from cart
 * DELETE /api/cart/:sessionId/items/:productVariantId
 */
router.delete('/:sessionId/items/:productVariantId', async (req, res) => {
  try {
    const { sessionId, productVariantId } = req.params;
    
    // Find cart by sessionId
    const cart = await ShoppingCart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      item => item.productVariant.toString() === productVariantId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Remove the item
    cart.items.splice(itemIndex, 1);
    
    // Update cart total and save
    cart.calculateTotal();
    await cart.save();
    
    // Return updated cart with populated product info
    const updatedCart = await ShoppingCart.findById(cart._id)
      .populate({
        path: 'items.productVariant',
        populate: [
          {
            path: 'product',
            select: 'name image'
          },
          {
            path: 'attributes.attribute',
            model: 'ProductAttribute'
          }
        ]
      });
    
    res.json(updatedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

/**
 * Clear cart
 * DELETE /api/cart/:sessionId
 */
router.delete('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Find cart by sessionId
    const cart = await ShoppingCart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Clear all items
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});

/**
 * Get all carts (admin only)
 * GET /api/cart
 */
router.get('/', async (req, res) => {
  try {
    // In a real app, this would be protected by authentication
    const carts = await ShoppingCart.find()
      .populate({
        path: 'items.productVariant',
        populate: [
          {
            path: 'product',
            select: 'name image'
          },
          {
            path: 'attributes.attribute',
            model: 'ProductAttribute'
          }
        ]
      });
    
    res.json(carts);
  } catch (error) {
    console.error('Error fetching all carts:', error);
    res.status(500).json({ message: 'Error fetching all carts', error: error.message });
  }
});

export default router;
