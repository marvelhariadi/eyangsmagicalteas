import { Category, Hero, Offer, Product, Support } from "../../utils/Route";


export const Home = () => {
  return (
    <>
      <Hero />
      {/* Flash sale section commented out due to styling issues */}
      {/* <Offer /> */}
      <Category />
      <Product />
      {/* <Support /> */}
    </>
  );
};