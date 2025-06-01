import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { CartItems } from "./CartItems";
import PropTypes from "prop-types";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const [cardOpen, setCardOpen] = useState(false);
  // We don't need dispatch anymore since we removed the clearCart functionality
  const navigate = useNavigate();
  
  const closeCard = () => {
    setCardOpen(null);
  };

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.itemsList);

  //total
  let total = 0;
  const itemsLists = useSelector((state) => state.cart.itemsList);
  itemsLists.forEach((item) => {
    total += item.totalPrice;
  });
  
  const goToCartPage = () => {
    closeCard();
    navigate('/cart');
  };

  return (
    <>
      <div className="card" onClick={() => setCardOpen(!cardOpen)}>
        <IoBagHandleOutline className="cardIcon" />
        <span className="flexCenter">{quantity}</span>
      </div>
      <div className={cardOpen ? "overlay" : "nonoverlay"}></div>

      <div className={cardOpen ? "cartItem" : "cardhide"}>
        <div className="title flex">
          <h2>Tea Cart</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className="icon" />
          </button>
        </div>
        {cartItems.map((item) => (
          <CartItems key={item.id} id={item.id} cover={item.cover} name={item.name} price={item.price} quantity={item.quantity} totalPrice={item.totalPrice} />
        ))}

        <div className="checkOut">
          <button onClick={goToCartPage}>
            <span>View Cart</span>
            <label htmlFor="">${total.toFixed(2)}</label>
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