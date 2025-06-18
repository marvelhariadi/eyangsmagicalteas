import express from 'express';
import ShoppingCart from '../models/ShoppingCart.js';

const router = express.Router();

/**
 * GET /api/admin/carts
 * Get all active shopping carts.
 * "Active" is currently defined as any cart in the database.
 */
router.get('/carts', async (req, res) => {
  try {
    const activeCarts = await ShoppingCart.find({})
      .sort({ updatedAt: -1 }) // Show most recently updated carts first
      .populate({
        path: 'items.productVariant',
        populate: {
          path: 'product',
          select: 'name',
        },
      });

    res.json(activeCarts);
  } catch (error) {
    console.error('Error fetching active carts:', error);
    res.status(500).json({ message: 'Error fetching active carts', error: error.message });
  }
});

export default router;
