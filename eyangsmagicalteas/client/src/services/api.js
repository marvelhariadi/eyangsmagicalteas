/**
 * API service for handling requests to the backend
 */

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch all products from the API
 * @param {string} categorySlug - Optional category slug to filter products
 * @returns {Promise<Array>} - Promise resolving to array of products
 */
export const fetchProducts = async (categorySlug = null) => {
  try {
    let url = `${API_BASE_URL}/products`;
    
    // Add category filter if provided
    if (categorySlug) {
      url += `?category=${categorySlug}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string|number} productId - ID of the product to fetch
 * @returns {Promise<Object>} - Promise resolving to product object
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

/**
 * Fetch all categories from the API
 * @returns {Promise<Array>} - Promise resolving to array of categories
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Helper function to organize products by category
 * @param {Array} products - Array of product objects
 * @returns {Object} - Object with category names as keys and arrays of products as values
 */
export const organizeProductsByCategory = (products) => {
  const organizedProducts = {};
  
  products.forEach(product => {
    if (product.categories && product.categories.length > 0) {
      product.categories.forEach(category => {
        const categoryName = category.name || category;
        
        if (!organizedProducts[categoryName]) {
          organizedProducts[categoryName] = [];
        }
        
        // Avoid adding the same product multiple times
        if (!organizedProducts[categoryName].find(p => p._id === product._id)) {
          organizedProducts[categoryName].push(product);
        }
      });
    } else {
      // For products without categories, put them in "Uncategorized"
      if (!organizedProducts["Uncategorized"]) {
        organizedProducts["Uncategorized"] = [];
      }
      
      if (!organizedProducts["Uncategorized"].find(p => p._id === product._id)) {
        organizedProducts["Uncategorized"].push(product);
      }
    }
  });
  
  return organizedProducts;
};
