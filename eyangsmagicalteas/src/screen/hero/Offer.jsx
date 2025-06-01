import PropTypes from "prop-types";
import { flashproduct, offerImgproduct } from "../../assets/data/data";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SampleNextArrows, SamplePrevArrows } from "./Hero";
import banner2 from "../../assets/images/offer/banner-2.png";
import { useState } from "react";

export function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button className="offer-arrow next-arrow" onClick={onClick}>
      <IoIosArrowForward size={18} />
    </button>
  );
}

export function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button className="offer-arrow prev-arrow" onClick={onClick}>
      <IoIosArrowBack size={18} />
    </button>
  );
}

export const Offer = () => {
  // removing the second carousel
  return (
    <>
      <section className="offer">
        <div className="container">
          <FlaseSales />
        </div>
      </section>
    </>
  );
};

export const FlaseSales = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = flashproduct.length;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  return (
    <div className="flashSale">
      <div className="content">
        <div className="imageWrapper">
          <img src={banner2} alt="Discount Banner. 50% for senior citizens" />
          <div className="animatedBg"></div>
        </div>
        <div className="products">
          <h1>Flash Sale</h1>
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {flashproduct.map((product, index) => {
                // Calculate discounted price
                const discountedPrice = product.price - (product.price * product.discount / 100);
                return (
                  <div className="carousel-slide" key={index}>
                    <div className="product">
                      <div className="img">
                        <img src={product.cover} alt="cover" />
                      </div>
                      <div className="details">
                        <h3>{product.name}</h3>
                        <div className="price">
                          <h3 className="price-tag">${discountedPrice.toFixed(2)}</h3>
                          <h3 className="underline">${product.price.toFixed(2)}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="progress">
                      <div className="flex">
                        <p>Discount: {product.discount}%</p>
                      </div>
                      <div className="progressBar">
                        <div className="progressFill" style={{ width: `${product.discount}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <SamplePrevArrow onClick={prevSlide} />
            <SampleNextArrow onClick={nextSlide} />
            <div className="carousel-dots">
              {flashproduct.map((_, index) => (
                <button 
                  key={index} 
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Offer.propTypes = {
  children: PropTypes.any,
};
SampleNextArrow.propTypes = {
  onClick: PropTypes.any,
};
SamplePrevArrow.propTypes = {
  onClick: PropTypes.any,
};