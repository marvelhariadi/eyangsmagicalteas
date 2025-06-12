import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { products } from "../../assets/data/data";
import "../../styles/product/productDetail.scss";

// Import a custom event emitter for cart visibility
import { cartEvents } from "../../utils/cartEvents";

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
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
      // Set default size to the first size
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0].name);
        setCurrentPrice(foundProduct.sizes[0].price);
      } else {
        setCurrentPrice(foundProduct.basePrice);
      }
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

  const handleSizeChange = (sizeName) => {
    setSelectedSize(sizeName);
    // Update price based on selected size
    if (selectedProduct && selectedProduct.sizes) {
      const sizeObj = selectedProduct.sizes.find(s => s.name === sizeName);
      if (sizeObj) {
        setCurrentPrice(sizeObj.price);
      }
    }
  };

  //wIth help from claudeAI bc this made me cry
  const addToCart = () => {
    if (selectedProduct) {
      // Add product with the selected quantity
      dispatch(
        cartActions.addToCart({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: currentPrice,
          cover: selectedProduct.cover,
          quantity: quantity,
          size: selectedSize || (selectedProduct.sizes ? selectedProduct.sizes[0].name : 'Default'),
        })
      );
      
      // Show the cart popup - use setTimeout to ensure it happens after Redux state update
      setTimeout(() => {
        cartEvents.emit('showCart');
      }, 100);
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
            <h2 className="price">${currentPrice.toFixed(2)}</h2>

            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-buttons">
                {selectedProduct.sizes && selectedProduct.sizes.map((sizeObj, index) => (
                  <button 
                    key={index} 
                    className={`size-btn ${selectedSize === sizeObj.name ? 'active' : ''}`}
                    onClick={() => handleSizeChange(sizeObj.name)}
                  >
                    {sizeObj.name}
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
