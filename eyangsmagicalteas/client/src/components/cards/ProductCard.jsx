import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getProductTeaImagePath } from "../../utils/imageUtils"; // Added import

export const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    // Use _id from MongoDB instead of id from local data
    navigate(`/product/${products._id}`);
  };
  
  // Extract description from either description or desc field
  const description = products.description || products.desc || "";
  
  // Get the price from either basePrice, price, or from the first variant if available
  const getPrice = () => {
    if (products.basePrice) return products.basePrice;
    if (products.price) return products.price;
    if (products.variants && products.variants.length > 0 && products.variants[0].price) {
      return products.variants[0].price;
    }
    return 0;
  };
  
  return (
    <>
      <div className="item" onClick={handleProductClick}>
        <div className="img">
          <img src={getProductTeaImagePath(products.cover || products.image)} alt={products.name} />
        </div>
        <div className="text">
          <h3>{products.name}</h3>
          <p>{description.length > 80 ? `${description.slice(0, 80)}...` : description}</p>
          <h3 className="price-tag">${getPrice()}</h3>
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  products: PropTypes.object.isRequired
};