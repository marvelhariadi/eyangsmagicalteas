import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create a model from the schema
const Category = mongoose.model('Category', categorySchema);

export default Category;
