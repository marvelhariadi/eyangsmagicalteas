import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import PropTypes from "prop-types";

export const CartItems = ({ id, cover, name, price, quantity, totalPrice, size }) => {
  const dispatch = useDispatch();

  const incCartitems = () => {
    dispatch(cartActions.addToCart({ id, name, price, size }));
  };
  const descCartitems = () => {
    dispatch(cartActions.removeFromCart({ id, size }));
  };
  return (
    <>
      <div className="cardList" key={id}>
        <div className="cartContent">
          <div className="img">
            <img src={cover} alt="" />
            <button className="remove flexCenter">
              <AiOutlineClose />
            </button>
          </div>
          <div className="details">
            <h3>{name}</h3>
            <p>Unit Price ${price.toFixed(2)}</p>
            <p className="size-info">Size: {size || 'Default'}</p>

            <div className="price">
              <div className="qty flexCenter">
                <button className="plus" onClick={incCartitems}>
                  <AiOutlinePlus size={24} />
                </button>
                <button className="num">{quantity}</button>
                <button className="minus" onClick={descCartitems}>
                  <AiOutlineMinus size={24} />
                </button>
              </div>
              <div className="priceTitle">${totalPrice.toFixed(2)}</div>
            </div>
          </div>
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