import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const TeaBags = () => {
  const [teaBagsProducts, setTeaBagsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch products with the magic-tea-bags category
        const products = await fetchProducts('magic-tea-bags');
        setTeaBagsProducts(products);
        setLoading(false);
      } catch (err) {
        console.error('Error loading tea bags products:', err);
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
          <h1>Magic Tea Bags</h1>
          <p>Our convenient pre-packaged tea bags with magical properties.</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="products-grid">
            {teaBagsProducts.map((product, index) => (
              <ProductCard key={product._id || index} products={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
