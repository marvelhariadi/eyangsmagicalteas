import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    // Use _id from MongoDB instead of id from local data
    navigate(`/product/${products._id}`);
  };
  
  // Extract description from either description or desc field
  const description = products.description || products.desc || "";
  
  // Handle image paths - if it's just a name, construct the full path
  const getImagePath = (imageName) => {
    if (!imageName) return "";
    
    // If the path already includes http:// or https:// or starts with /, it's already a full path
    if (imageName.includes("http") || imageName.startsWith("/")) {
      return imageName;
    }
    
    // Otherwise, construct the path to the image in the assets folder
    return `/src/assets/images/product_teas/${imageName}.png`;
  };
  
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
          <img src={getImagePath(products.cover || products.image)} alt={products.name} />
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