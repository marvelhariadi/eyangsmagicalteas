import express from 'express';
import User from './models/User.js';
import Product from './models/Product.js';
import users from './data/Users.js';
import products from './data/Products.js';

const router = express.Router();

router.post("/users", async (req, res) => {
  //using an await
  await User.deleteMany({});
  const UserSeeder = await User.insertMany(users);
  res.send(UserSeeder);
});

router.post("/products", async (req, res) => {
  await Product.deleteMany({});
  const ProductSeeder = await Product.insertMany(products);
  res.send(ProductSeeder);
});

export default router;
