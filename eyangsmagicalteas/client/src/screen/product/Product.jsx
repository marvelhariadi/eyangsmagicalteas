import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { ProductCard } from "../../components/cards/ProductCard";

export const Product = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products
        const allProducts = await fetchProducts();
        
        // Extract unique categories from products
        const uniqueCategories = [];
        const categoryMap = {};
        
        // Group products by category
        const productsByCat = {};
        
        allProducts.forEach(product => {
          if (product.categories && product.categories.length > 0) {
            product.categories.forEach(category => {
              // Skip best-sellers category
              if (category.slug === 'best-sellers') return;
              
              // Add category to unique categories if not already added
              if (!categoryMap[category.slug]) {
                categoryMap[category.slug] = true;
                uniqueCategories.push({
                  id: category._id,
                  name: category.name,
                  description: category.description,
                  sectionId: category.slug
                });
              }
              
              // Add product to category
              if (!productsByCat[category.slug]) {
                productsByCat[category.slug] = [];
              }
              
              // Avoid adding the same product multiple times
              if (!productsByCat[category.slug].find(p => p._id === product._id)) {
                productsByCat[category.slug].push(product);
              }
            });
          }
        });
        
        setCategories(uniqueCategories);
        setProductsByCategory(productsByCat);
        setLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="product">
        <div className="container">
          <div className="loading-state">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product">
        <div className="container">
          <div className="error-state">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="product">
        <div className="container" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <h1 className="section-title">Our Magical Products</h1>
          
          {categories.map((category) => (
            <div key={category.id} id={category.sectionId} className="product-category-section">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <div className="content">
                {productsByCategory[category.sectionId] && productsByCategory[category.sectionId].map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};