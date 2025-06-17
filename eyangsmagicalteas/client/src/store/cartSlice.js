import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartBySessionId,
  addToCart as apiAddToCart,
  updateCartItemQuantity as apiUpdateCartItemQuantity,
  removeCartItem as apiRemoveCartItem,
} from "../services/api";
import { getOrCreateCartId } from "../utils/cartUtils";

// Async thunk to fetch the cart from the backend.
// No arguments needed, it gets the session ID from localStorage.
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const sessionId = getOrCreateCartId();
      const response = await getCartBySessionId(sessionId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Async thunk to add an item to the cart.
// Expects { productVariantId, quantity } in the payload.
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      const sessionId = getOrCreateCartId();
      // The API expects { productVariantId, quantity }
      const response = await apiAddToCart(sessionId, itemData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Async thunk to update an item's quantity in the cart.
// Expects { productVariantId, quantity } in the payload.
export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ productVariantId, quantity }, { rejectWithValue }) => {
    try {
      const sessionId = getOrCreateCartId();
      const response = await apiUpdateCartItemQuantity(sessionId, productVariantId, { quantity });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Async thunk to remove an entire item from the cart (regardless of quantity).
// Expects productVariantId in the payload.
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productVariantId, { rejectWithValue }) => {
    try {
      const sessionId = getOrCreateCartId();
      const response = await apiRemoveCartItem(productVariantId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // This will now be populated from the backend
    totalQuantity: 0,
    totalAmount: 0,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // We can add non-async reducers here if needed in the future
    clearCartState: (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        state.status = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Specific reducer for addItemToCart.fulfilled
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCart = action.payload;
        state.items = updatedCart.items;
        state.totalQuantity = updatedCart.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = updatedCart.totalAmount;
      })
      // Centralized handler for pending states
      .addMatcher(
        (action) => action.type.startsWith("cart/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null; // Clear previous errors on a new request
        }
      )
      // Centralized handler for fulfilled states
      .addMatcher(
        (action) => action.type.startsWith("cart/") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          const cart = action.payload;
          
          // The backend cart has 'items' and 'totalAmount'
          state.items = cart.items || [];
          state.totalAmount = cart.totalAmount || 0;
          
          // Recalculate total quantity based on the items received from the backend
          state.totalQuantity = state.items.reduce(
            (total, item) => total + item.quantity,
            0
          );
        }
      )
      // Centralized handler for rejected states
      .addMatcher(
        (action) => action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          // Store a serializable error message
          state.error = action.payload?.message || action.error.message || "An unknown error occurred";
        }
      );
  },
});

export const { clearCartState } = cartSlice.actions;
export const cartActions = { ...cartSlice.actions, fetchCart, addItemToCart, updateItemQuantity, removeItemFromCart };
export default cartSlice.reducer;