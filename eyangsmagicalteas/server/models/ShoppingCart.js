import mongoose from 'mongoose';

// Define a schema for cart items
const cartItemSchema = new mongoose.Schema({
  productVariant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductVariant',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false }); // No need for separate IDs for each item

const shoppingCartSchema = new mongoose.Schema({
  // Cart can be associated with a user (logged in) or a session (anonymous)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    sparse: true // Allow null for anonymous carts
  },
  sessionId: {
    type: String,
    sparse: true, // Allow null for user carts
    // index: true -- makes duplicate indexes!!!!
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

// Ensure either user or sessionId is present
shoppingCartSchema.pre('validate', function(next) {
  if (!this.user && !this.sessionId) {
    return next(new Error('Either user or sessionId must be provided'));
  }
  next();
});

// Create a compound index to ensure uniqueness of user or sessionId
shoppingCartSchema.index({ user: 1 }, { unique: true, sparse: true });
shoppingCartSchema.index({ sessionId: 1 }, { unique: true, sparse: true });

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
