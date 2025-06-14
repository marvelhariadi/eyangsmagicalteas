import mongoose from 'mongoose';

// Define a schema for cart items
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  size: {
    type: String,
    default: 'Default'
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false }); // No need for separate IDs for each item

const shoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One cart per user
  },
  items: [cartItemSchema], // Array of cart items
  totalAmount: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create a virtual property for item count
shoppingCartSchema.virtual('itemCount').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Method to calculate the total amount
shoppingCartSchema.methods.calculateTotal = function() {
  this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return this.totalAmount;
};

// Pre-save middleware to update the total amount before saving
shoppingCartSchema.pre('save', function(next) {
  this.calculateTotal();
  this.lastUpdated = Date.now();
  next();
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
