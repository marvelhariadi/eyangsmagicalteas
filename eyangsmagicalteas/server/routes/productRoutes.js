import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const category = req.query.category;
  try {
    let products;
    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
