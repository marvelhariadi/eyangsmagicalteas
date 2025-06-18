import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";

export function SampleNextArrows(props) {
  const { onClick } = props;
  return (
    <button className="next-arrow" onClick={onClick}>
      <IoIosArrowForward size={25} />
    </button>
  );
} 

export function SamplePrevArrows(props) {
  const { onClick } = props;
  return (
    <button className="prev-arrow" onClick={onClick}>
      <IoIosArrowBack size={25} />
    </button>
  );
}


export const Hero = () => {
  const handleShopNow = () => {
    // Find the product section and scroll to it
    const productSection = document.querySelector('.product');
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="box">
        <div className="img">
          <img src="/images/heroBanners/hero_1.png" alt="Hero Banner" />
          <div className="text-overlay">
            <h1>Dreams come true, one cup at a time</h1>
            <p>At <b><i>Eyang’s Magical Teas</i></b>, we craft enchanted tea blends to support any manifestation you seek. From uncovering hidden truths to summoning courage in the face of adversity, there’s a brew for every need.</p>
            <p>Your manifestations are only ever one sip away.</p>
            <button onClick={handleShopNow}>Shop Now</button> 
          </div>
        </div>
      </div>
      
      {/* Custom arrows overlaid on the static image */}
      {/* <button className="prev-arrow">
        <IoIosArrowBack size={25} />
      </button>
      <button className="next-arrow">
        <IoIosArrowForward size={25} />
      </button> */}
    </section>
  );
};

SampleNextArrows.propTypes = {
  onClick: PropTypes.any,
};
SamplePrevArrows.propTypes = {
  onClick: PropTypes.any,
};