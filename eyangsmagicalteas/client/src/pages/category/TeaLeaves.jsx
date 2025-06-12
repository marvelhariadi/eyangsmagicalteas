import React from "react";
import { products, categories } from "../../assets/data/data";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const TeaLeaves = () => {
  // Find the tea leaves category
  const category = categories.find(cat => cat.sectionId === "magic-tea-leaves");
  const teaLeavesProducts = products["magic-tea-leaves"] || [];

  return (
    <section className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>{category?.title || "Magic Tea Leaves"}</h1>
          <p>{category?.description || "Our selection of magical tea leaves with various enchanting properties."}</p>
        </div>

        <div className="products-grid">
          {teaLeavesProducts.map((product, index) => (
            <ProductCard key={index} products={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
