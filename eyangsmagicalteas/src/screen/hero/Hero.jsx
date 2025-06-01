import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import hero1 from "../../assets/images/heroBanners/hero_1.png";

// export function SampleNextArrows(props) {
//   const { onClick } = props;
//   return (
//     <button className="next-arrow" onClick={onClick}>
//       <IoIosArrowForward size={25} />
//     </button>
//   );
// } 

// export function SamplePrevArrows(props) {
//   const { onClick } = props;
//   return (
//     <button className="prev-arrow" onClick={onClick}>
//       <IoIosArrowBack size={25} />
//     </button>
//   );
// }


export const Hero = () => {
  const handleShopNow = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="box">
        <div className="img">
          <img src={hero1} alt="Hero Banner" />
          <div className="text-overlay">
            <h1>Dreams come true, one sip at a time</h1>
            <p>At Eyang’s Tea Shop, we craft enchanted tea blends to support any manifestation you seek. From uncovering hidden truths to summoning courage in the face of adversity, there’s a brew for every need.</p>
            <p>Need clarity? Strength? Protection? Whatever your intention, your path begins with a cup. Your manifestation is just one sip away.</p>
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

// SampleNextArrows.propTypes = {
//   onClick: PropTypes.any,
// };
// SamplePrevArrows.propTypes = {
//   onClick: PropTypes.any,
// };