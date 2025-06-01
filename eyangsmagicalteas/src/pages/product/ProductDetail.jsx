import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { products } from "../../assets/data/data";
import "../../styles/product/productDetail.scss";

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
    
    // Find the product by ID across all categories
    let foundProduct = null;
    
    // Products is an object with categories as keys, each containing an array of products
    Object.values(products).forEach(categoryProducts => {
      const found = categoryProducts.find(p => p.id === parseInt(productId));
      if (found) {
        foundProduct = found;
      }
    });
    
    if (foundProduct) {
      setSelectedProduct(foundProduct);
    } else {
      // Redirect to home if product not found
      navigate("/");
    }
  }, [productId, navigate]);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Don't go below 1
  };

  const addToCart = () => {
    if (selectedProduct) {
      dispatch(
        cartActions.addToCart({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          cover: selectedProduct.cover,
          quantity: quantity,
        })
      );
      // Silent add to cart without popup
      // User can check the cart in their own time
    }
  };

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!selectedProduct) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="product-detail">
      <div className="container">
        <button className="back-button" onClick={goBack}>
          <IoMdClose size={20} />
        </button>
        
        <div className="product-content">
          <div className="product-image">
            <img src={selectedProduct.cover} alt={selectedProduct.name} />
          </div>
          
          <div className="product-info">
            <h1>{selectedProduct.name}</h1>
            <p className="description">{selectedProduct.desc}</p>
            <h2 className="price">${selectedProduct.price}</h2>

            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-buttons">
                {selectedProduct.size.map((size, index) => (
                  <button key={index} className="size-btn">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="purchase-options">
              <div className="quantity-selector">
                <button className="plus" onClick={increaseQuantity}>
                  <FiPlus size={20} />
                </button>
                <span className="quantity">{quantity}</span>
                <button className="minus" onClick={decreaseQuantity}>
                  <FiMinus size={20} />
                </button>
              </div>
              
              <button className="add-to-cart-btn" onClick={addToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
