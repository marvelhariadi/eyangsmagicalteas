import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { cartActions } from "../../store/cartSlice";
import "../../styles/cart/shoppingCart.scss";

// Helper to get the correct image path
const getImagePath = (imageName) => {
  if (!imageName || imageName.includes('http') || imageName.startsWith('/')) {
    return imageName;
  }
  return `/src/assets/images/product_teas/${imageName}.png`;
};

export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    // Fetch the cart data when the component mounts
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productVariantId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(cartActions.updateItemQuantity({ productVariantId, quantity: newQuantity }));
    } else {
      // If quantity is reduced to 0, remove the item
      dispatch(cartActions.removeItemFromCart(productVariantId));
    }
  };

  const handleRemoveItem = (productVariantId) => {
    dispatch(cartActions.removeItemFromCart(productVariantId));
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const renderCartContent = () => {
    if (status === 'loading') {
      return <div className="loading-cart"><h2>Loading your magical teas...</h2></div>;
    }

    if (status === 'failed') {
      return <div className="empty-cart"><h2>Error</h2><p>{error}</p></div>;
    }

    if (items.length === 0) {
      return (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any magical teas to your cart yet.</p>
          <button onClick={handleContinueShopping} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="cart-header">
          <div className="product-info">Product</div>
          <div className="price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
          <div className="actions">Actions</div>
        </div>

        <div className="cart-items">
          {items.map(({ productVariant, quantity }) => (
            <div className="cart-item" key={productVariant._id}>
              <div className="product-info">
                <div className="product-image">
                  <img src={getImagePath(productVariant.product.image)} alt={productVariant.product.name} />
                </div>
                <div className="product-details">
                  <h3>{productVariant.product.name}</h3>
                  <p>Size: {productVariant.attributes.find(a => a.attribute.name.toLowerCase() === 'size')?.value || 'N/A'}</p>
                </div>
              </div>

              <div className="price">${productVariant.price.toFixed(2)}</div>

              <div className="quantity">
                <div className="quantity-selector">
                  <button
                    className="decrease"
                    onClick={() => handleUpdateQuantity(productVariant._id, quantity - 1)}
                  >
                    <AiOutlineMinus size={20} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="increase"
                    onClick={() => handleUpdateQuantity(productVariant._id, quantity + 1)}
                  >
                    <AiOutlinePlus size={20} />
                  </button>
                </div>
              </div>

              <div className="total">${(productVariant.price * quantity).toFixed(2)}</div>

              <div className="actions">
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(productVariant._id)}
                >
                  <AiOutlineDelete size={20} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
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
    );
  };

  return (
    <div className="shopping-cart">
      <div className="container">
        <h1>Your Shopping Cart</h1>
        {renderCartContent()}
      </div>
    </div>
  );
};
