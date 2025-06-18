import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../services/api";
import "../../styles/home/category.scss";

export const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleCategoryClick = (slug) => {
    // Map category slugs to route paths
    const routeMap = {
      "magic-tea-leaves": "/category/tea-leaves",
      "tea-pots": "/category/tea-pots",
      "magic-tea-bags": "/category/tea-bags",
      "best-sellers": "/category/best-sellers" // Navigate to Best Sellers page
    };
    
    // Navigate to the appropriate category page
    if (routeMap[slug]) {
      navigate(routeMap[slug]);
    }
  };

  if (loading) {
    return (
      <section className="category">
        <div className="container">
          <h1 className="cinzel-title">Browse Categories</h1>
          <div className="loading-state">Loading categories...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="category">
        <div className="container">
          <h1 className="cinzel-title">Browse Categories</h1>
          <div className="error-state">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="category">
      <div className="container">
        <h1 className="cinzel-title">Browse Categories</h1>
        
        <div className="category-container">
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="category-item" 
              onClick={() => handleCategoryClick(category.slug)}
              role="button"
            >
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};