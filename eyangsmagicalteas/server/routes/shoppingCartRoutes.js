import express from 'express';
import ShoppingCart from '../models/ShoppingCart.js';
import ProductVariant from '../models/ProductVariant.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get a shopping cart by sessionId or userId
router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.query.userId; // Optional, if user is logged in
    
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: 'Either sessionId or userId is required' });
    }
    
    // Find the cart and populate product variant details
    let cart = await ShoppingCart.findOne(query)
      .populate({
        path: 'items.productVariant',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name image'
        }
      });
    
    // If no cart exists, create a new one
    if (!cart) {
      cart = new ShoppingCart({
        ...(userId ? { user: userId } : {}),
        ...(sessionId ? { sessionId } : {}),
        items: [],
        totalAmount: 0
      });
      await cart.save();
    }
    
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting shopping cart:', error);
    res.status(500).json({ message: 'Error getting shopping cart', error: error.message });
  }
});

// Add an item to the cart
router.post('/:sessionId/items', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { productVariantId, quantity, userId } = req.body;
    
    if (!productVariantId || !quantity) {
      return res.status(400).json({ message: 'Product variant ID and quantity are required' });
    }
    
    // Find the product variant to get its price
    const productVariant = await ProductVariant.findById(productVariantId).populate('product');
    if (!productVariant) {
      return res.status(404).json({ message: 'Product variant not found' });
    }
    
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: 'Either sessionId or userId is required' });
    }
    
    // Find the cart or create a new one
    let cart = await ShoppingCart.findOne(query);
    if (!cart) {
      cart = new ShoppingCart({
        ...(userId ? { user: userId } : {}),
        ...(sessionId ? { sessionId } : {}),
        items: [],
        totalAmount: 0
      });
    }
    
    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productVariant.toString() === productVariantId
    );
    
    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productVariant: productVariantId,
        quantity,
        price: productVariant.price
      });
    }
    
    // Save the cart
    await cart.save();
    
    // Fetch the updated cart with populated product details
    const updatedCart = await ShoppingCart.findById(cart._id)
      .populate({
        path: 'items.productVariant',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name image'
        }
      });
    
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

// Update cart item quantity
router.put('/:sessionId/items/:itemId', async (req, res) => {
  try {
    const { sessionId, itemId } = req.params;
    const { quantity, userId } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }
    
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: 'Either sessionId or userId is required' });
    }
    
    // Find the cart
    const cart = await ShoppingCart.findOne(query);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find the item in the cart
    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Update the quantity
    item.quantity = quantity;
    
    // Save the cart
    await cart.save();
    
    // Fetch the updated cart with populated product details
    const updatedCart = await ShoppingCart.findById(cart._id)
      .populate({
        path: 'items.productVariant',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name image'
        }
      });
    
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
});

// Remove an item from the cart
router.delete('/:sessionId/items/:itemId', async (req, res) => {
  try {
    const { sessionId, itemId } = req.params;
    const { userId } = req.query;
    
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: 'Either sessionId or userId is required' });
    }
    
    // Find the cart
    const cart = await ShoppingCart.findOne(query);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove the item from the cart
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    
    // Save the cart
    await cart.save();
    
    // Fetch the updated cart with populated product details
    const updatedCart = await ShoppingCart.findById(cart._id)
      .populate({
        path: 'items.productVariant',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name image'
        }
      });
    
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

// Clear the cart
router.delete('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userId } = req.query;
    
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: 'Either sessionId or userId is required' });
    }
    
    // Find the cart
    const cart = await ShoppingCart.findOne(query);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Clear the items
    cart.items = [];
    
    // Save the cart
    await cart.save();
    
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});

export default router;
