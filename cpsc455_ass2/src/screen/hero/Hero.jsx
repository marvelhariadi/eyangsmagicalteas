import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import hero1 from "../../assets/images/heroBanners/hero_1.png";

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
  return (
    <>
      <section className="hero">
        <div className="box">
          <div className="img">
            <img src={hero1} alt="Hero Banner" />
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
    </>
  );
};

SampleNextArrows.propTypes = {
  onClick: PropTypes.any,
};
SamplePrevArrows.propTypes = {
  onClick: PropTypes.any,
};