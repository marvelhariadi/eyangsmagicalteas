// import { Footer, Header } from "../../utils/Route";
// import Footer from "../common/Footer";
// import Header from "../header/Header";
import {Footer, Header} from "../../utils/Route";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired, //make sure the children is valid and avail!!
};