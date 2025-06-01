import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../../assets/data/data';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addCart } from '../../store/cartSlice';
import '../../styles/search/searchResults.scss';

export const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get search query from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Search through all products across all categories
  const searchResults = [];
  
  // Only process if products is defined and has keys
  if (products && typeof products === 'object') {
    // Iterate through each category in the products object
    Object.keys(products).forEach(category => {
      if (Array.isArray(products[category])) {
        // Filter products in this category that match the search term
        const matchingProducts = products[category].filter(product => {
          if (!product) return false;
          const searchTerm = query.toLowerCase();
          return (
            (product.name && product.name.toLowerCase().includes(searchTerm)) ||
            (product.desc && product.desc.toLowerCase().includes(searchTerm)) ||
            (category && category.toLowerCase().includes(searchTerm))
          );
        });
        
        // Add matching products to results
        if (matchingProducts.length > 0) {
          searchResults.push(...matchingProducts);
        }
      }
    });
  }
  
  const handleAddToCart = (product) => {
    dispatch(addCart({
      id: product.id,
      name: product.name,
      price: product.price,
      cover: product.cover,
      quantity: 1,
      category: product.category
    }));
  };
  
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}?category=${product.category}`);
  };
  
  // Handle the case where the query is empty
  const displayQuery = query || 'all products';

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft />
          </button>
          <h1>Search Results for "{displayQuery}"</h1>
          <p>{searchResults.length} products found</p>
        </div>
        
        {searchResults.length === 0 ? (
          <div className="no-results">
            <h2>No products found matching "{displayQuery}"</h2>
            <p>Try a different search term or browse our categories</p>
            <button className="browse-button" onClick={() => navigate('/')}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {searchResults.map((product, index) => (
              <div className="product-card" key={`${product.category || 'unknown'}-${product.id || index}`}>
                <div className="product-image" onClick={() => handleProductClick(product)}>
                  {product.cover ? (
                    <img src={product.cover} alt={product.name || 'Product image'} />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 onClick={() => handleProductClick(product)}>
                    {product.name || 'Unnamed Product'}
                  </h3>
                  <p className="product-price">
                    ${(product.price || 0).toFixed(2)}
                  </p>
                  <p className="product-category">
                    {(product.category || '').replace(/-/g, ' ')}
                  </p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
