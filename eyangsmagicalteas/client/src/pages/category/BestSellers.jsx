import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const BestSellers = () => {
  const [bestSellersProducts, setBestSellersProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch products with the best-sellers category
        const products = await fetchProducts('best-sellers');
        setBestSellersProducts(products);
        setLoading(false);
      } catch (err) {
        console.error('Error loading best sellers products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  return (
    <section className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>Best Sellers</h1>
          <p>Our most popular magical products loved by customers.</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="products-grid">
            {bestSellersProducts.map((product, index) => (
              <ProductCard key={product._id || index} products={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
