import mongoose from 'mongoose';

// Define a schema for attribute-value pairs
const attributeValueSchema = new mongoose.Schema({
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductAttribute',
    required: true
  },
  value: {
    type: String,
    required: true
  }
}, { _id: false });

const productVariantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  attributes: [attributeValueSchema],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(value) {
        return Number.isInteger(value) && value >= 0;
      },
      message: 'Stock must be a non-negative integer'
    }
  },
  sku: {
    type: String,
    trim: true,
    unique: true,
    sparse: true // Allows null/undefined values to bypass unique constraint
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Index for efficient lookups by product
productVariantSchema.index({ product: 1 });

// Method to check if the variant is in stock
productVariantSchema.methods.isInStock = function() {
  return this.stock > 0 && this.active;
};

// Virtual for formatted variant name (combining product name with variant attributes)
productVariantSchema.virtual('variantName').get(function() {
  // This will be populated when the product is populated
  if (!this.populated('product') || !this.populated('attributes.attribute')) {
    return '';
  }
  
  const attributeValues = this.attributes.map(attr => {
    return `${attr.attribute.name}: ${attr.value}`;
  }).join(', ');
  
  return `${this.product.name} (${attributeValues})`;
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;
