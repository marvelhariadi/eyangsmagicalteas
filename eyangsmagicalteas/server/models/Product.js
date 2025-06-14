import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Stores a path or URL to the image
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Virtual for checking if product is a best-seller
productSchema.virtual('isBestSeller').get(function() {
  // This can be calculated based on order history or manually set
  return this.featured;
});

const Product = mongoose.model('Product', productSchema);

export default Product;
 