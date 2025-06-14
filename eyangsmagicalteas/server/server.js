import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import databaseSeeder from "./databaseSeeder.js";
import productRoutes from './routes/productRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") }); // Configure dotenv with explicit path

//database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3000;

// API routes. database seeder
app.use("/api/seed", databaseSeeder);
app.use("/api/products", productRoutes);

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
