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
    
    // Clear the cart (optional, depending on your business logic)
    cart.items = [];
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
