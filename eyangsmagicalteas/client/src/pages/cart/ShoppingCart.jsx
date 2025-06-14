import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { cartActions } from "../../store/cartSlice";
import "../../styles/cart/shoppingCart.scss";

export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.itemsList); //gets itemList from cartslice from the cart STATE
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
  
  const handleIncreaseQuantity = (item) => {
    dispatch(cartActions.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      cover: item.cover,
      size: item.size, // Add the size property to ensure correct item matching
    }));
  };
  
  const handleDecreaseQuantity = (item) => {
    dispatch(cartActions.removeFromCart({
      id: item.id,
      size: item.size
    }));
  };
  
  const handleRemoveItem = (item) => {
    // Create a custom action to remove all quantities of an item at once
    dispatch({
      type: 'cart/removeEntireItem',
      payload: {
        id: item.id,
        size: item.size
      }
    });
  };
  
  const handleContinueShopping = () => {
    navigate("/");
  };
  
  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate("/checkout");
  };
  
  return (
    <div className="shopping-cart">
      <div className="container">
        <h1>Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any magical teas to your cart yet.</p>
            <button onClick={handleContinueShopping} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <div className="product-info">Product</div>
              <div className="price">Price</div>
              <div className="quantity">Quantity</div>
              <div className="total">Total</div>
              <div className="actions">Actions</div>
            </div>
            
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="product-info">
                    <div className="product-image">
                      <img src={item.cover} alt={item.name} />
                    </div>
                    <div className="product-details">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                  
                  <div className="price">${item.price.toFixed(2)}</div>
                  
                  <div className="quantity">
                    <div className="quantity-selector">
                      <button 
                        className="decrease" 
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                      >
                        <AiOutlineMinus size={20} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="increase" 
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <AiOutlinePlus size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="total">${item.totalPrice.toFixed(2)}</div>
                  
                  <div className="actions">
                    <button 
                      className="remove-item" 
                      onClick={() => handleRemoveItem(item)}
                    >
                      <AiOutlineDelete size={20} />
                      Remove
                    </button>
                  </div>
                </div>))}
            </div>
            
            <div className="cart-summary">
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
              
              <div className="cart-actions">
                <button onClick={handleContinueShopping} className="continue-shopping">
                  Continue Shopping
                </button>
                <button onClick={handleCheckout} className="checkout">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
