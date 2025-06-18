import express from 'express';
import Order from '../models/Order.js';
import ShoppingCart from '../models/ShoppingCart.js';
import ProductVariant from '../models/ProductVariant.js';
import Product from '../models/Product.js';

const router = express.Router();

// Create a new order from a shopping cart
router.post('/', async (req, res) => {
  try {
    const { sessionId, userId, customerName, email } = req.body;
    
    if (!customerName) {
      return res.status(400).json({ message: 'Customer name is required' });
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
    const cart = await ShoppingCart.findOne(query)
      .populate({
        path: 'items.productVariant',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name image'
        }
      });
    
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart not found or empty' });
    }

    // --- Stock Validation before creating order ---
    for (const item of cart.items) {
      // The productVariant on the cart item is already populated from the query above
      const productVariant = item.productVariant;
      if (productVariant.stock < item.quantity) {
        return res.status(400).json({
          message: `Sorry, '${productVariant.product.name}' is no longer available in the requested quantity. Please update your cart.`,
          error: 'INSUFFICIENT_STOCK',
          productName: productVariant.product.name,
          variantId: productVariant._id
        });
      }
    }
    
    // Generate a unique order number
    const orderNumber = Order.generateOrderNumber();
    
    // Create order items from cart items
    const orderItems = cart.items.map(item => {
      const productVariant = item.productVariant;
      const product = productVariant.product;
      
      // Create a description for the variant
      const variantDescription = productVariant.attributes
        .map(attr => `${attr.value}`)
        .join(', ');
      
      return {
        productVariant: productVariant._id,
        productName: product.name,
        variantDescription,
        pricePaid: item.price,
        quantity: item.quantity,
        image: product.image,
        totalPrice: item.price * item.quantity
      };
    });
    
    // Create the order
    const order = new Order({
      customerName,
      email,
      orderNumber,
      items: orderItems,
      totalAmount: cart.totalAmount,
      status: 'pending'
    });
    
    // Save the order
    await order.save();

    // --- Decrement stock for each item in the order ---
    // console.log('[Order Creation] Attempting to decrement stock for order items...');
    const stockUpdatePromises = cart.items.map(item => {
      const variantId = item.productVariant._id;
      const quantityToDecrement = item.quantity;
      // console.log(`[Order Creation] Preparing to decrement stock for ProductVariant ID: ${variantId} by quantity: ${quantityToDecrement}`);
      
      return ProductVariant.updateOne(
        { _id: variantId },
        { $inc: { stock: -quantityToDecrement } }
      )
      .then(updateResult => {
        // console.log(`[Order Creation] Stock update result for ProductVariant ID ${variantId}:`, JSON.stringify(updateResult));
        if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
          // console.warn(`[Order Creation] Stock for ProductVariant ID ${variantId} was not modified. This might happen if the stock was already 0 or if the $inc operation had no effect for other reasons.`);
        } else if (updateResult.matchedCount === 0) {
          // console.error(`[Order Creation] CRITICAL: ProductVariant ID ${variantId} NOT FOUND during stock decrement. This should not happen if stock validation passed.`);
        }
        return updateResult;
      })
      .catch(err => {
        // console.error(`[Order Creation] Error updating stock for ProductVariant ID ${variantId}:`, err);
        // Decide if you want to throw the error to stop Promise.all or handle it
        // For now, logging and continuing so other stock updates might proceed, but this is a critical error.
        return { error: true, variantId, details: err }; 
      });
    });

    try {
      const results = await Promise.all(stockUpdatePromises);
      // console.log('[Order Creation] All stock update promises resolved. Results:', JSON.stringify(results));
      results.forEach(result => {
        if (result.error) {
          // console.error(`[Order Creation] A critical error occurred during stock update for variant ${result.variantId}. Manual check required.`);
          // Potentially mark the order for review or notify admin
        }
      });
    } catch (error) {
      // console.error('[Order Creation] CRITICAL: Error during Promise.all for stock updates:', error);
      // This error might indicate a larger issue or an unhandled promise rejection from one of the updates
      // At this point, the order is saved, but stock might be inconsistent.
      // Consider adding logic to flag this order for manual review.
    }
    
    // Clear the cart (optional, depending on your business logic)
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// Get orders by customer name (for demo purposes)
router.get('/customer/:name', async (req, res) => {
  try {
    const orders = await Order.find({ 
      customerName: { $regex: new RegExp(req.params.name, 'i') }
    }).sort({ createdAt: -1 });
    
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by customer:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

export default router;
