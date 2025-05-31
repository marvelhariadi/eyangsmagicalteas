import { Footer, Header } from "../../utils/Route";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main> //page-specific content
      <Footer />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired, //make sure the children is valid and avail!!
};