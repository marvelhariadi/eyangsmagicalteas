import mongoose from 'mongoose';

const categoryProductSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Compound index to ensure a category-product pair is unique
categoryProductSchema.index({ category: 1, product: 1 }, { unique: true });

const CategoryProduct = mongoose.model('CategoryProduct', categoryProductSchema);

export default CategoryProduct;
