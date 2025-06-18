/**
 * Cart utility functions
 */

// Function to get a unique cart session ID for the current browser session.
// Fetches a new ID from the backend if one doesn't exist in sessionStorage.
export const getOrCreateCartId = async () => {
  let cartSessionId = sessionStorage.getItem('cartSessionId');

  if (!cartSessionId) {
    try {
      const response = await fetch('/api/cart/session/new');
      if (!response.ok) {
        throw new Error(`Failed to initiate session: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.sessionId) {
        cartSessionId = data.sessionId;
        sessionStorage.setItem('cartSessionId', cartSessionId);
      } else {
        console.error('Failed to retrieve sessionId from backend.');
        // Fallback or further error handling might be needed here
        // For now, returning null or throwing an error are options
        return null; 
      }
    } catch (error) {
      console.error('Error fetching new cart session ID:', error);
      // Fallback or further error handling
      return null;
    }
  }
  return cartSessionId;
};

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Placeholder for future cart utility functions
export const initializeCart = () => {
  console.log('Cart initialized without session ID');
  return null;
};
