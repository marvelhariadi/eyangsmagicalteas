import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { products } from '../../assets/data/data';
import { ProductCard } from '../../components/cards/ProductCard';
import '../../styles/search/searchResults.scss';

// I used this tutorial to help me make this cursed ass page: https://www.youtube.com/watch?v=ZF73dpgRrWI

export const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all products in a flat array
  const allProducts = [
    ...products['magic-tea-leaves'],
    ...products['tea-pots'],
    ...products['magic-tea-bags']
  ];
  
  useEffect(() => {
    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
    
    // Filter products based on search term
    if (query.trim() === '') {
      // If no search term, show all products
      setFilteredProducts(allProducts);
    } else {
      // Filter products by name, description, or category
      const filtered = allProducts.filter(product => {
        const searchLower = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.desc.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      });
      setFilteredProducts(filtered);
    }
  }, [location.search]);

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft />
          </button>
          <h1>Search Results</h1>
          <p>{filteredProducts.length} products found {searchTerm && `for "${searchTerm}"`}</p>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={`${product.category}-${product.id}`} products={product} />
            ))}
          </div>
        ) : (
          //defauly appearancer. hence no conditional stmt
          <div className="no-results">
            <h2>No products found</h2>
            <p>Try a different search term or browse our categories</p>
            <button className="browse-button" onClick={() => navigate('/')}>
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
