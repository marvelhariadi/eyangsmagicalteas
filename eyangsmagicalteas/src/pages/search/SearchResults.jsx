import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import '../../styles/search/searchResults.scss';

export const SearchResults = () => {
  const navigate = useNavigate();

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft />
          </button>
          <h1>Search Results</h1>
          <p>0 products found</p>
        </div>
        
        <div className="no-results">
          <h2>No products found</h2>
          <p>Try a different search term or browse our categories</p>
          <button className="browse-button" onClick={() => navigate('/')}>
            Browse Products
          </button>
        </div>
      </div>
    </div>
  );
};
