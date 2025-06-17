import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { CartItems } from "./CartItems";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { cartEvents } from "../../utils/cartEvents";
import { cartActions } from "../../store/cartSlice";

export const Cart = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    items,
    totalQuantity,
    totalAmount,
    status,
    error,
  } = useSelector((state) => state.cart);

  // Fetch cart data when the component mounts for the first time
  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);
  
  const closeCard = () => {
    setCardOpen(false);
  };

  const openCard = (e) => {
    e.stopPropagation();
    // Fetch the latest cart data every time the cart is opened
    dispatch(cartActions.fetchCart());
    setCardOpen(true);
  };
  
  const goToCartPage = () => {
    closeCard();
    navigate('/cart');
  };

  // Listen for external events to show the cart (e.g., after adding an item)
  useEffect(() => {
    const showCartHandler = () => {
      dispatch(cartActions.fetchCart());
      setCardOpen(true);
    };
    
    cartEvents.on('showCart', showCartHandler);
    
    return () => {
      cartEvents.off('showCart', showCartHandler);
    };
  }, [dispatch]);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardOpen && !e.target.closest('.cartItem') && !e.target.closest('.card')) {
        closeCard();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [cardOpen]);

  const renderCartContent = () => {
    if (status === 'loading') {
      return <div className="emptyCart"><p>Loading...</p></div>;
    }
    if (status === 'failed') {
      return <div className="emptyCart"><p>Error: {error}</p></div>;
    }
    if (items.length === 0) {
      return <div className="emptyCart"><p>Your cart is empty</p></div>;
    }
    return items.map((item) => (
      <CartItems
        key={item.productVariant._id} // Use a unique key from the backend data
        item={item} // Pass the whole item object
      />
    ));
  };

  return (
    <>
      <div className="card" onClick={openCard}>
        <IoBagHandleOutline className="cardIcon" />
        {/* Show total quantity only if it's greater than 0 */}
        {totalQuantity > 0 && <span className="flexCenter">{totalQuantity}</span>}
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
          {renderCartContent()}
        </div>

        <div className="checkOut">
          <button onClick={goToCartPage} disabled={items.length === 0 || status === 'loading'}>
            <span>View Cart</span>
            {/* Display total amount from the state */}
            <label>${totalAmount.toFixed(2)}</label>
          </button>
        </div>
      </div>
    </>
  );
};