import React from "react";
import { products, categories } from "../../assets/data/data";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const TeaBags = () => {
  // Find the tea bags category
  const category = categories.find(cat => cat.sectionId === "magic-tea-bags");
  const teaBagsProducts = products["magic-tea-bags"] || [];

  return (
    <section className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>{category?.title || "Magic Tea Bags"}</h1>
          <p>{category?.description || "Our convenient pre-packaged tea bags with magical properties."}</p>
        </div>

        <div className="products-grid">
          {teaBagsProducts.map((product, index) => (
            <ProductCard key={index} products={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
