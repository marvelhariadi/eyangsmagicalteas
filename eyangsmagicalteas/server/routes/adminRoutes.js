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
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const activeCarts = await ShoppingCart.find({
      'items.0': { $exists: true }, // Ensure the cart is not empty
      updatedAt: { $gte: twentyFourHoursAgo }, // Filter for carts updated in the last 24 hours
    })
      .sort({ updatedAt: -1 })
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
