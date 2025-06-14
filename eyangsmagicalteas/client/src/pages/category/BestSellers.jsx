import React from "react";
import { products, categories } from "../../assets/data/data";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const BestSellers = () => {
  // Find the best sellers category
  const category = categories.find(cat => cat.sectionId === "best-sellers");
  const bestSellersProducts = products["best-sellers"] || [];

  return (
    <section className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>{category?.name || "Best Sellers"}</h1>
          <p>{category?.description || "Our most popular magical products loved by customers."}</p>
        </div>

        <div className="products-grid">
          {bestSellersProducts.map((product, index) => (
            <ProductCard key={index} products={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
