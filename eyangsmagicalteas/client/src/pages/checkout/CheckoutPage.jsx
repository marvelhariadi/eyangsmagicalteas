import React, { useState, useEffect } from "react"; // Added useEffect
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";
import { createOrder } from "../../store/orderSlice"; // Import createOrder thunk
import { getOrCreateCartId } from "../../utils/cartUtils"; // Import cart utility
import { getProductTeaImagePath } from "../../utils/imageUtils"; // Added import
import "../../styles/checkout/checkoutPage.scss";

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const order = useSelector((state) => state.order); // Get the whole order slice
  const [customerName, setCustomerName] = useState("");
  // We'll use order.status instead of local isSubmitting and orderComplete
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [orderComplete, setOrderComplete] = useState(false);
  // const [orderId, setOrderId] = useState("");

  // Calculate total price
  // Calculate total price - using cartTotalAmount from Redux state directly
  const totalPrice = cartTotalAmount;

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  // const generateOrderId = () => { // Backend will generate order ID and number
    // Generate a random order ID with format: EMT-YYYY-XXXX
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    // return `EMT-${year}-${randomNum}`;
  // };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      alert("Please enter your name to complete the checkout.");
      return;
    }

    const sessionId = await getOrCreateCartId();
    // You can add an email field to your form and pass it here if desired
    // const email = customerEmail; 
    dispatch(createOrder({ customerName, sessionId /*, email */ }));
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

    useEffect(() => {
    // When order is successfully created, then clear the cart
    if (order.status === 'succeeded' && order.currentOrder) {
      dispatch(cartActions.clearCartState());
    }
  }, [order.status, order.currentOrder, dispatch]);

  // If cart is empty and not from a completed order, redirect to cart
  if (cartItems.length === 0 && order.status !== 'succeeded') {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1>Checkout</h1>
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Please add some products to your cart before checking out.</p>
            <button onClick={handleContinueShopping} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If order is complete, show confirmation
  if (order.status === 'succeeded' && order.currentOrder) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-header">
            <h1>Order Confirmed!</h1>
          </div>
          <div className="order-confirmation">
            <div className="confirmation-details">
              <p>Thank you for your order, <strong>{order.currentOrder.customerName}</strong>!</p>
              <p>Your order number is: <strong>{order.currentOrder.orderNumber}</strong></p>
              <p>We'll prepare your magical teas with care.</p>
            </div>
            <button onClick={handleContinueShopping} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <h2>Customer Information</h2>
            <form onSubmit={handleCheckout}>
              <div className="form-group">
                <label htmlFor="customerName">Your Name</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={handleNameChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={handleBackToCart} 
                  className="back-to-cart"
                  disabled={order.status === 'loading'}
                >
                  Back to Cart
                </button>
                <button 
                  type="submit" 
                  className="place-order"
                  disabled={order.status === 'loading'}
                >
                  {order.status === 'loading' ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div className="summary-item" key={item.productVariant._id}>
                  <div className="item-info">
                    <div className="item-image">
                      <img src={item.productVariant.product?.image ? getProductTeaImagePath(item.productVariant.product.image) : '/path/to/default-image.png'} alt={item.productVariant.product?.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.productVariant.product?.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="item-price">${(item.productVariant.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
