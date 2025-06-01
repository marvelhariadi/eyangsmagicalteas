import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const quantity = newItem.quantity || 1; // Default to 1 if quantity not provided

      // Check if item already exists with the same size
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        // Update existing item
        existingItem.quantity += quantity;
        existingItem.totalPrice += newItem.price * quantity;
      } else {
        // Add new item
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: quantity,
          totalPrice: newItem.price * quantity,
          name: newItem.name,
          cover: newItem.cover,
          size: newItem.size || 'Default',
        });
      }

      // Update total quantity - count actual items, not just unique entries
      state.totalQuantity = state.itemsList.reduce(
        (total, item) => total + item.quantity, 0
      );
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === id && item.size === size
      );
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item completely if quantity is 1
          state.itemsList = state.itemsList.filter(
            (item) => !(item.id === id && item.size === size)
          );
        } else {
          // Decrease quantity if more than 1
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        
        // Update total quantity
        state.totalQuantity = state.itemsList.reduce(
          (total, item) => total + item.quantity, 0
        );
      }
    },
    clearCart(state) {
      state.itemsList = [];
      state.totalQuantity = 0;
    },
    removeEntireItem(state, action) {
      const { id, size } = action.payload;
      // Find the item to remove
      const itemToRemove = state.itemsList.find(
        (item) => item.id === id && item.size === size
      );
      
      if (itemToRemove) {
        // Remove the item from the list
        state.itemsList = state.itemsList.filter(
          (item) => !(item.id === id && item.size === size)
        );
        
        // Update total quantity
        state.totalQuantity = state.itemsList.reduce(
          (total, item) => total + item.quantity, 0
        );
      }
    },
  },
});
export const { clearCart } = cartSlice.actions;

export const cartActions = cartSlice.actions;
export default cartSlice;