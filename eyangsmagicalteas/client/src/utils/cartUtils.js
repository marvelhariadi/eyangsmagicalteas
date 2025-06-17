/**
 * Cart utility functions
 * Note: Cart session ID functionality has been temporarily removed to fix React hook errors
 */
import { v4 as uuidv4 } from 'uuid';

// Function to get or create a unique cart session ID
export const getOrCreateCartId = () => {
  let cartId = localStorage.getItem('cartId');
  if (!cartId) {
    cartId = uuidv4();
    localStorage.setItem('cartId', cartId);
  }
  return cartId;
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
