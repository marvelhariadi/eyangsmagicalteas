import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";
import "../../styles/checkout/checkoutPage.scss";

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.itemsList);
  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const generateOrderId = () => {
    // Generate a random order ID with format: EMT-YYYY-XXXX
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    return `EMT-${year}-${randomNum}`;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      alert("Please enter your name to complete the checkout.");
      return;
    }

    setIsSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      setOrderComplete(true);
      
      // Clear the cart
      dispatch(cartActions.clearCart());
      setIsSubmitting(false);
    }, 1000);
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  // If cart is empty and not from a completed order, redirect to cart
  if (cartItems.length === 0 && !orderComplete) {
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
  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-header">
            <h1>Order Confirmed!</h1>
          </div>
          <div className="order-confirmation">
            <div className="confirmation-details">
              <p>Thank you for your order, <strong>{customerName}</strong>!</p>
              <p>Your order number is: <strong>{orderId}</strong></p>
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
                  disabled={isSubmitting}
                >
                  Back to Cart
                </button>
                <button 
                  type="submit" 
                  className="place-order"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div className="summary-item" key={`${item.id}-${item.size}`}>
                  <div className="item-info">
                    <div className="item-image">
                      <img src={item.cover} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="item-price">${item.totalPrice.toFixed(2)}</div>
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
