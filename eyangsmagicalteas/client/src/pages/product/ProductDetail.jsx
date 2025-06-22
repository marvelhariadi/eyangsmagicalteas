import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { fetchProductById } from "../../services/api";
import { getProductTeaImagePath } from "../../utils/imageUtils"; // Added import
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
  const [currentStock, setCurrentStock] = useState(0); // Add state for stock
  const [notification, setNotification] = useState({ show: false, message: '', type: '' }); // Add state for notification
  const dispatch = useDispatch();
  const [selectedVariantId, setSelectedVariantId] = useState(null);

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
            const firstVariant = product.variants[0];
            
            // Find the size attribute in the variant
            let sizeValue = 'Default';
            if (firstVariant.attributes && firstVariant.attributes.length > 0) {
              // Look for an attribute that represents size
              const sizeAttribute = firstVariant.attributes.find(attr => 
                attr.attribute && 
                (attr.attribute.name === 'Size' || attr.attribute.name.toLowerCase().includes('size'))
              );
              
              if (sizeAttribute) {
                sizeValue = sizeAttribute.value;
              }
            }
            
            setSelectedVariantId(firstVariant._id);
            setSelectedSize(sizeValue);
            setCurrentPrice(firstVariant.price || product.price);
            setCurrentStock(firstVariant.stock); // Set initial stock
          } else {
            // If no variants, use base price
            setCurrentPrice(product.price || 0);
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
    if (quantity < currentStock) {
      setQuantity(prev => prev + 1);
    } else {
      showNotification(`Only ${currentStock} items available`, 'error');
    }
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Don't go below 1
  };

  const handleSizeChange = (sizeValue) => {
    setSelectedSize(sizeValue);
    
    // Update price based on selected size
    if (selectedProduct && selectedProduct.variants) {
      // Find the variant that has this size value
      const variant = selectedProduct.variants.find(v => {
        if (!v.attributes || !v.attributes.length) return false;
        
        // Look for the size attribute in this variant
        return v.attributes.some(attr => 
          attr.attribute && 
          (attr.attribute.name === 'Size' || attr.attribute.name.toLowerCase().includes('size')) && 
          attr.value === sizeValue
        );
      });
      
      if (variant) {
        setCurrentPrice(variant.price);
        setSelectedVariantId(variant._id);
        setCurrentStock(variant.stock); // Update stock on size change
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds
  };

  const addToCart = () => {
    if (currentStock === 0) {
      showNotification("item sold out :(", "error");
      return;
    }

    if (quantity > currentStock) {
      showNotification(`Only ${currentStock} items available. Please adjust the quantity.`, 'error');
      return;
    }

    if (selectedProduct && selectedVariantId) {
      console.log('Adding to cart: ProductVariantID:', selectedVariantId, 'Quantity:', quantity);
      dispatch(
        cartActions.addItemToCart({
          productVariantId: selectedVariantId,
          quantity: quantity,
        })
      );

      // Show the cart popup
      setTimeout(() => {
        cartEvents.emit("showCart");
      }, 100);
    } else {
      console.error("Product variant not selected.");
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
      {notification.show && (
        <div className={`notification-popup ${notification.type} ${notification.show ? 'show' : ''}`}>
          {notification.message}
        </div>
      )}
      <div className="container">
        <button className="back-button" onClick={goBack}>
          <IoMdClose size={20} />
        </button>
        
        <div className="product-content">
          <div className="product-image">
            <img src={getProductTeaImagePath(selectedProduct.image)} alt={selectedProduct.name} />
          </div>
          
          <div className="product-info">
            <h1>{selectedProduct.name}</h1>
            <p className="description">{selectedProduct.description}</p>
            <h2 className="price">${currentPrice.toFixed(2)}</h2>

            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-buttons">
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  // Extract unique size values from variants
                  [...new Set(selectedProduct.variants
                    .filter(v => v.attributes && v.attributes.length > 0)
                    .flatMap(v => v.attributes
                      .filter(attr => 
                        attr.attribute && 
                        (attr.attribute.name === 'Size' || attr.attribute.name.toLowerCase().includes('size'))
                      )
                      .map(attr => attr.value)
                    )
                  )].map((sizeValue, index) => (
                    <button 
                      key={index} 
                      className={`size-btn ${selectedSize === sizeValue ? 'active' : ''}`}
                      onClick={() => handleSizeChange(sizeValue)}
                    >
                      {sizeValue}
                    </button>
                  ))
                )}
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
              
              <button 
                className="add-to-cart-btn" 
                onClick={addToCart}
                disabled={currentStock === 0}
              >
                {currentStock === 0 ? 'Out of Stock' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
