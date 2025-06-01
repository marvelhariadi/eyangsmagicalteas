import { product } from "../../assets/data/data";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ProductCard } from "../../components/cards/ProductCard";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

export const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handlePopup = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity when opening a new product
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleBackgroundClick = (e) => {
    // Close popup when clicking on the background (outside the popup-inner)
    if (e.target.className === 'popup') {
      closePopup();
    }
  };

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
      // Optional: Close the popup after adding to cart
      // closePopup();
    }
  };
  return (
    <>
      <section className="product">
        <div className="container" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <h1>Our Most Magical Teas</h1>
          <div className="content">
            {product.map((product, index) => (
              <ProductCard key={index} products={product} handlePopup={handlePopup} />
            ))}
          </div>
        </div>
      </section>
      {selectedProduct && (
        <div className="popup" onClick={handleBackgroundClick}>
          <div className="popup-inner">
            <button className="close-btn" onClick={closePopup}>
              <IoMdClose size={20} />
            </button>
            <div className="list">
              <img src={selectedProduct.cover} alt={selectedProduct.name} />
            </div>
            <div className="details">
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.desc}</p>
              <h3 className="price-tag">${selectedProduct.price}</h3>

              <div className="size">
                <h3>Size</h3>
                <div className="size-buttons">
                  {selectedProduct.size.map((size, index) => (
                    <button key={index} className="size-btn">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color selection removed as requested */}

              <div className="flex">
                <div className="add-to-cart">
                  <button className="plus" onClick={increaseQuantity}>
                    <FiPlus size={20} />
                  </button>
                  <button className="text">{quantity}</button>
                  <button className="minus" onClick={decreaseQuantity}>
                    <FiMinus size={20} />
                  </button>
                </div>
                <div className="add">
                  <button className="primarybtn" onClick={addToCart}>
                    Add To Cart
                  </button>
                </div>
              </div>
              <button className="primarybtn link"> View Details</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};