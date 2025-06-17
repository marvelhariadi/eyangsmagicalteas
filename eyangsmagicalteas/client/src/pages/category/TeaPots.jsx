import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { ProductCard } from "../../components/cards/ProductCard";
import "../../styles/category/categoryPage.scss";

export const TeaPots = () => {
  const [teaPotsProducts, setTeaPotsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch products with the tea-pots category
        const products = await fetchProducts('tea-pots');
        setTeaPotsProducts(products);
        setLoading(false);
      } catch (err) {
        console.error('Error loading tea pots products:', err);
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
          <h1>Tea Pots</h1>
          <p>Our collection of magical tea pots that enhance your brewing experience.</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="products-grid">
            {teaPotsProducts.map((product, index) => (
              <ProductCard key={product._id || index} products={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
