import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { searchProducts } from '../../services/api';
import { ProductCard } from '../../components/cards/ProductCard';
import '../../styles/search/searchResults.scss';

// I used this tutorial to help me make this cursed ass page: https://www.youtube.com/watch?v=ZF73dpgRrWI

export const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const performSearch = async () => {
      try {
        setLoading(true);
        
        // Get search query from URL
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        setSearchTerm(query);
        
        // Use the backend search API
        const searchResults = await searchProducts(query);
        setProducts(searchResults);
        setLoading(false);
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Failed to search products. Please try again later.');
        setLoading(false);
      }
    };
    
    performSearch();
  }, [location.search]);

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft />
          </button>
          <h1>Search Results</h1>
          <p>{loading ? 'Searching...' : `${products.length} products found ${searchTerm ? `for "${searchTerm}"` : ''}`}</p>
        </div>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={`${product._id}`} products={product} />
            ))}
          </div>
        ) : (
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
