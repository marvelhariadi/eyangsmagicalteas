import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { fetchProductById } from "../../services/api";
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
    
    // Loading state
    const loadProduct = async () => {
      try {
        const product = await fetchProductById(productId);
        
        if (product) {
          setSelectedProduct(product);
          // Set default size to the first size if available
          if (product.variants && product.variants.length > 0) {
            // Assuming variants contain size information
            const firstVariant = product.variants[0];
            setSelectedSize(firstVariant.name || 'Default');
            setCurrentPrice(firstVariant.price || product.price);
          } else {
            setCurrentPrice(product.price);
          }
        } else {
          // Redirect to home if product not found
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        // Redirect to home on error
        navigate("/");
      }
    };
    
    loadProduct();
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
    if (selectedProduct && selectedProduct.variants) {
      const variant = selectedProduct.variants.find(v => v.name === sizeName);
      if (variant) {
        setCurrentPrice(variant.price);
      }
    }
  };

  //wIth help from claudeAI bc this made me cry
  const addToCart = () => {
    if (selectedProduct) {
      // Add product with the selected quantity
      dispatch(
        cartActions.addToCart({
          id: selectedProduct._id,
          name: selectedProduct.name,
          price: currentPrice,
          cover: selectedProduct.imageUrl || selectedProduct.image,
          quantity: quantity,
          size: selectedSize || 'Default',
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
            <img src={selectedProduct.imageUrl || selectedProduct.image} alt={selectedProduct.name} />
          </div>
          
          <div className="product-info">
            <h1>{selectedProduct.name}</h1>
            <p className="description">{selectedProduct.desc}</p>
            <h2 className="price">${currentPrice.toFixed(2)}</h2>

            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-buttons">
                {selectedProduct.variants && selectedProduct.variants.map((variant, index) => (
                  <button 
                    key={index} 
                    className={`size-btn ${selectedSize === variant.name ? 'active' : ''}`}
                    onClick={() => handleSizeChange(variant.name)}
                  >
                    {variant.name}
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
