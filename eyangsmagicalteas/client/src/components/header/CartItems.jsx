import { AiOutlineClose } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import PropTypes from 'prop-types';

// Helper to get the correct image path
const getImagePath = (imageName) => {
  if (!imageName || imageName.includes('http') || imageName.startsWith('/')) {
    return imageName;
  }
  return `/src/assets/images/product_teas/${imageName}.png`;
};

export const CartItems = ({ item }) => {
  console.log('[CartItems] Rendering item:', JSON.parse(JSON.stringify(item)));
  if (item && item.productVariant && item.productVariant.attributes) {
    console.log('[CartItems] item.productVariant.attributes:', JSON.parse(JSON.stringify(item.productVariant.attributes)));
    item.productVariant.attributes.forEach((attr, index) => {
      console.log(`[CartItems] attributes[${index}].attribute type: ${typeof attr.attribute}, value:`, JSON.parse(JSON.stringify(attr.attribute)));
    });
  }
  const dispatch = useDispatch();
  const { productVariant, quantity } = item;
  const { product, price, attributes } = productVariant;

  // Find the size attribute for display
  const sizeAttribute = attributes.find(attr => attr.attribute && typeof attr.attribute === 'object' && attr.attribute.name && attr.attribute.name.toLowerCase() === 'size');
  const size = sizeAttribute ? sizeAttribute.value : 'N/A';

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(cartActions.updateItemQuantity({ productVariantId: productVariant._id, quantity: newQuantity }));
    } else {
      // If quantity becomes 0, remove the item
      dispatch(cartActions.removeItemFromCart(productVariant._id));
    }
  };

  const handleRemoveItem = () => {
    dispatch(cartActions.removeItemFromCart(productVariant._id));
  };

  if (!product) {
    // This can happen if the product associated with a variant is deleted.
    // It's good practice to handle this gracefully.
    return (
      <div className="cartContent removed-item">
        <p>This item is no longer available and has been removed from your cart.</p>
        <button onClick={handleRemoveItem}>Remove</button>
      </div>
    );
  }

  return (
    <div className="cartContent">
      <div className="img">
        <img src={getImagePath(product.image)} alt={product.name} />
        <button className="remove flexCenter" onClick={handleRemoveItem}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="details">
        <h3>{product.name}</h3>
        <p>Unit Price ${price?.toFixed(2)}</p>
        <p className="size-info">Size: {size}</p>
        <div className="price">
          <div className="qty flexCenter">
            <button className="plus" onClick={() => handleUpdateQuantity(quantity + 1)}>
              <FiPlus />
            </button>
            <button className="num">{quantity}</button>
            <button className="minus" onClick={() => handleUpdateQuantity(quantity - 1)}>
              <FiMinus />
            </button>
          </div>
          <div className="priceTitle">${(price * quantity).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

CartItems.propTypes = {
  item: PropTypes.shape({
    productVariant: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
      }),
      price: PropTypes.number.isRequired,
      attributes: PropTypes.arrayOf(PropTypes.shape({
        attribute: PropTypes.shape({ name: PropTypes.string }),
        value: PropTypes.string
      }))
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};