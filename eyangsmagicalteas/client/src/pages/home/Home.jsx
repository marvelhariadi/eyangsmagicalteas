import { Category, Hero, Offer, Product, Support } from "../../utils/Route";
import { CategoryHomeShowcase } from "../../components/home/CategoryHomeShowcase.jsx";

export const Home = () => {
  return (
    <>
      <Hero />
      <Category />
      {/* General Product Listing Section */}
      <h1 className="cinzel-title" id="our-magical-products">Our Magical Products</h1>

      {/* Best Sellers Section - now under 'Our Magical Products' and before general products */}
      <CategoryHomeShowcase 
        sectionTitle="Our Best Sellers"
        sectionDescription="Our most popular and highly-rated magical teas."
        categorySlug="best-sellers"
        numItemsToDisplay={3}
        randomizeDisplay={true}
      />

      <Product />
    </>
  );
};