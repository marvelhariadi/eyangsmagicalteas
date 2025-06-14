import mongoose from 'mongoose';

// Define a schema for order items
const orderItemSchema = new mongoose.Schema({
  // Reference to the product variant for historical tracking
  productVariant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductVariant',
    required: true
  },
  // Store product details at time of order (snapshot)
  productName: {
    type: String,
    required: true
  },
  variantDescription: {
    type: String,
    required: true
  },
  pricePaid: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String, // Image URL/path
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { _id: false }); // No need for separate IDs for each item

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  items: [orderItemSchema], // Array of purchased products
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create a virtual property for item count
orderSchema.virtual('itemCount').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Create a method to generate a unique order number
orderSchema.statics.generateOrderNumber = function() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `EMT-${year}-${randomNum}`;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
