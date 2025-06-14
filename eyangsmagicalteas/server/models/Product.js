import mongoose from 'mongoose';

// Define a schema for the 'sizes' array
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  }
}, { _id: false }); // _id: false for subdocuments if you don't need a separate ID for each size variant

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  cover: {
    type: String, // Assuming this will store a path or URL to the image
    required: true
  },
  sizes: [sizeSchema], // Array of size sub-documents
  category: {
    type: [String], // Changed to support multiple categories
    required: true,
    validate: {
      validator: function(arr) {
        const allowedCategories = ['magic-tea-leaves', 'tea-pots', 'magic-tea-bags', 'best-sellers'];
        return arr.every(cat => allowedCategories.includes(cat));
      },
      message: props => `${props.value} contains an invalid category.`
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const Product = mongoose.model('Product', productSchema);

export default Product;
 