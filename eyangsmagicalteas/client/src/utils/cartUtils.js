/**
 * Cart utility functions
 */

// Module-level promise to manage in-flight requests for a new session ID
let cartIdPromise = null;

// Function to get a unique cart session ID for the current browser session.
// Prevents race conditions when fetching a new ID from the backend.
export const getOrCreateCartId = async () => {
  let cartSessionId = sessionStorage.getItem('cartSessionId');

  if (cartSessionId) {
    return cartSessionId;
  }

  // If a request is already in flight, return its promise
  if (cartIdPromise) {
    return cartIdPromise;
  }

  // No session ID in storage and no request in flight, so initiate one
  cartIdPromise = (async () => {
    try {
      const response = await fetch('/api/cart/session/new');
      if (!response.ok) {
        throw new Error(`Failed to initiate session: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data && data.sessionId) {
        sessionStorage.setItem('cartSessionId', data.sessionId);
        return data.sessionId;
      } else {
        console.error('Failed to retrieve sessionId from backend.');
        throw new Error('Failed to retrieve sessionId from backend.');
      }
    } catch (error) {
      console.error('Error fetching new cart session ID:', error);
      // Ensure the promise rejects so callers can handle the error
      throw error; 
    } finally {
      // Reset the promise variable once the operation is complete (success or failure)
      // This allows future calls (e.g., if sessionStorage is cleared) to make a new request.
      cartIdPromise = null;
    }
  })();

  return cartIdPromise;
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
