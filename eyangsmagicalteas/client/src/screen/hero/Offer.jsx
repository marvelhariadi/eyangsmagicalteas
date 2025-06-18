import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SampleNextArrows, SamplePrevArrows } from "./Hero";
// Unused imports commented out
// import banner2 from "../../assets/images/offer/banner-2.png";
// import { useState } from "react";

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
          {/* Flash Sales component commented out due to styling issues with carousel */}
          {/* <FlaseSales /> */}
        </div>
      </section>
    </>
  );
};

// Flash Sales component commented out due to missing flashproduct data and styling issues with carousel
export const FlaseSales = () => {
  // Return null to avoid rendering issues
  return null;
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