import { Category, Hero, Offer, Product, Support } from "../../utils/Route";
import { CategoryHomeShowcase } from "../../components/home/CategoryHomeShowcase.jsx";

export const Home = () => {
  return (
    <>
      <Hero />
      <Category />
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