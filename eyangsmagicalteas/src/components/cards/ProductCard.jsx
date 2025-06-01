import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    navigate(`/product/${products.id}`);
  };
  
  return (
    <>
      <div className="item" onClick={handleProductClick}>
        <div className="img">
          <img src={products.cover} alt={products.name} />
        </div>
        <div className="text">
          <h3>{products.name}</h3>
          <p>{products.desc.slice(0, 80)}...</p>
          <h3 className="price-tag">${products.price}</h3>
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  products: PropTypes.object.isRequired
};