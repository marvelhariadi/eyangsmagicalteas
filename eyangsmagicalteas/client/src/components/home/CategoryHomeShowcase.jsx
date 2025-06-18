import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { ProductCard } from "../cards/ProductCard";
import "../../styles/home/categoryHomeShowcase.scss"; // Ensure this SCSS file is renamed or created

export const CategoryHomeShowcase = ({ 
  categorySlug, 
  sectionTitle, 
  sectionDescription, 
  numItemsToDisplay = 3, 
  randomizeDisplay = false 
}) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts(categorySlug);
        let productsToDisplay = products;
        if (randomizeDisplay && products.length > numItemsToDisplay) {
          const shuffled = [...products].sort(() => 0.5 - Math.random());
          productsToDisplay = shuffled.slice(0, numItemsToDisplay);
        } else if (products.length > numItemsToDisplay) {
          productsToDisplay = products.slice(0, numItemsToDisplay);
        } // else display all products if fewer than numItemsToDisplay

        setDisplayedProducts(productsToDisplay);
          
        setLoading(false);
      } catch (err) {
        console.error(`Error loading products for ${categorySlug} home section:`, err);
        setError(`Failed to load ${sectionTitle}. Please try again later.`);
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug, numItemsToDisplay, randomizeDisplay, sectionDescription]);

  if (loading) {
    return (
      <section className="product-category-section">
        <div className="container">
          <h2>{sectionTitle}</h2>
          <div className="loading-state">Loading {sectionTitle}...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-category-section">
        <div className="container">
          <h2>{sectionTitle}</h2>
          
          <div className="error-state">{error}</div>
        </div>
      </section>
    );
  }

  if (displayedProducts.length === 0) {
    return null; // Don't render the section if no best sellers are found (or after filtering none are left)
  }

  return (
    <section className="product-category-section">
      <div className="container">
        <h2>{sectionTitle}</h2>
        {sectionDescription && <p>{sectionDescription}</p>}
        <div className="content">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product._id || index} products={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
