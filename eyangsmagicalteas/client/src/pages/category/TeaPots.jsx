import React from "react";
import { products, categories } from "../../assets/data/data";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const TeaPots = () => {
  // Find the tea pots category
  const category = categories.find(cat => cat.sectionId === "tea-pots");
  const teaPotsProducts = products["tea-pots"] || [];

  return (
    <section className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>{category?.title || "Tea Pots"}</h1>
          <p>{category?.description || "Our collection of magical tea pots that enhance your brewing experience."}</p>
        </div>

        <div className="products-grid">
          {teaPotsProducts.map((product, index) => (
            <ProductCard key={index} products={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
