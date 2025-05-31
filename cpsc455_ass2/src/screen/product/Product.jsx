// import { product } from "../../assets/data/data";
// import AppImg from "../../assets/images/app-store.svg";
// import playImg from "../../assets/images/play-store.svg";
// import Img from "../../assets/images/app2.webp";
// import { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { FiMinus, FiPlus } from "react-icons/fi";
// import { ProductCard } from "../../components/cards/ProductCard";
// import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import { cartActions } from "../../store/cartSlice";

export const Product = () => {
  return (
    <div className="product">
      <div className="container">
        <h2>Product Section</h2>
        <p>This is a placeholder for the product section</p>
      </div>
    </div>
  );
};

// export const ProductApp = () => {
//   return (
//     <>
//       <section className="app-section">
//         <div className="container flex">
//           <div className="left">
//             <h3>The ChawkBazar App</h3>
//             <h1>
//               Share Your <span>Ideas</span> & Shop Endless <span>Inspiration</span>
//             </h1>
//             <div className="apps">
//               <img src={AppImg} alt="app" />
//               <img src={playImg} alt="play" />
//             </div>
//           </div>
//           <div className="right">
//             <img src={Img} alt="play" />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export const RecentlyProduct = ({ handlePopup }) => {
//   return (
//     <>
//       <section className="product">
//         <div className="container">
//           <h1>Recently View Products</h1>
//           <div className="content">
//             {product.slice(11, 21).map((product, index) => (
//               <ProductCard key={index} products={product} handlePopup={handlePopup} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// RecentlyProduct.propTypes = {
//   handlePopup: PropTypes.any,
// };