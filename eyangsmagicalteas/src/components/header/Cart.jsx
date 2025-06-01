import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { CartItems } from "./CartItems";
import PropTypes from "prop-types";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { cartEvents } from "../../utils/cartEvents";

export const Cart = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const navigate = useNavigate();
  
  const closeCard = () => {
    setCardOpen(false);
  };

  const openCard = (e) => {
    e.stopPropagation();
    setCardOpen(true);
  };

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.itemsList);

  // Calculate total
  let total = 0;
  cartItems.forEach((item) => {
    total += item.totalPrice;
  });
  
  const goToCartPage = () => {
    closeCard();
    navigate('/cart');
  };

  // Listen for cart show events
  useEffect(() => {
    const showCartHandler = () => {
      setCardOpen(true);
    };
    
    cartEvents.on('showCart', showCartHandler);
    
    return () => {
      cartEvents.off('showCart', showCartHandler);
    };
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close if clicking outside the cart and it's open
      if (cardOpen && !e.target.closest('.cartItem') && !e.target.closest('.card')) {
        setCardOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [cardOpen]);

  return (
    <>
      <div className="card" onClick={openCard}>
        <IoBagHandleOutline className="cardIcon" />
        <span className="flexCenter">{quantity}</span>
      </div>
      
      {cardOpen && <div className="overlay" onClick={closeCard}></div>}

      <div className={cardOpen ? "cartItem" : "cardhide"} onClick={(e) => e.stopPropagation()}>
        <div className="title flex">
          <h2>Shopping Cart</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className="icon" />
          </button>
        </div>
        
        <div className="cart-items-container">
          {cartItems.length > 0 ? cartItems.map((item) => (
            <CartItems 
              key={item.id} 
              id={item.id} 
              cover={item.cover} 
              name={item.name} 
              price={item.price} 
              quantity={item.quantity} 
              totalPrice={item.totalPrice} 
              size={item.size}
            />
          )) : (
            <div className="emptyCart">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        <div className="checkOut">
          <button onClick={goToCartPage} disabled={cartItems.length === 0}>
            <span>View Cart</span>
            <label>${total.toFixed(2)}</label>
          </button>
        </div>
      </div>
    </>
  );
};
CartItems.propTypes = {
  id: PropTypes.number,
  cover: PropTypes.any,
  name: PropTypes.any,
  price: PropTypes.any,
  quantity: PropTypes.any,
  totalPrice: PropTypes.any,
};