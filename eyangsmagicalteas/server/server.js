import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import databaseSeeder from "./databaseSeeder.js";
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import shoppingCartRoutes from './routes/shoppingCartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") }); // Configure dotenv with explicit!!! path

//database
console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);

// Set mongoose connection options. here for troubleshooting.
const mongooseOptions = {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("Connection details:", {
      uri: process.env.MONGODB_URI ? `${process.env.MONGODB_URI.substring(0, 20)}...` : 'undefined',
      options: mongooseOptions
    });
  });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// API routes
app.use("/api/seed", databaseSeeder);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", shoppingCartRoutes);
app.use("/api/orders", orderRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// tuturial I used to help me: https://www.youtube.com/watch?v=7fBh4noiBOw
// also this one https://www.youtube.com/watch?v=iGvyCs_6PxE&list=PLRQ1njZomKvF9Xewm0BRR1M-DLE-joGeQ&index=5
