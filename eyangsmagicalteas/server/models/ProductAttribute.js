import mongoose from 'mongoose';

const productAttributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  values: {
    type: [String],
    required: true,
    validate: {
      validator: function(values) {
        return values.length > 0;
      },
      message: 'At least one attribute value is required'
    }
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create a model from the schema
const ProductAttribute = mongoose.model('ProductAttribute', productAttributeSchema);

export default ProductAttribute;
