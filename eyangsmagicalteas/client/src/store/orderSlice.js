import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// No default import needed from api.js
// We'll construct the API call directly or use a specific function if available.

const API_BASE_URL = 'http://localhost:3000/api'; // Assuming this is your base URL

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    // ... (existing createOrder logic remains the same) ...
    try {
      // orderData should include: { customerName, email (optional), sessionId }
      const response = await fetch(`${API_BASE_URL}/orders`, { // Construct the URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        // Attempt to parse error response from backend, otherwise use status text
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw { response, data: errorData }; // Throw an object that rejectWithValue can use
      }

      const data = await response.json();
      return data; // The created order object from the backend
    } catch (error) {
      // If error has a 'data' property (from our throw), use it, else use generic message
      const errorMessage = error.data ? error.data.message : error.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// NEW: Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => { // No argument needed for fetching all
    try {
      const response = await fetch(`${API_BASE_URL}/orders`); // GET request
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw { response, data: errorData };
      }
      const data = await response.json();
      return data; // Array of order objects
    } catch (error) {
      const errorMessage = error.data ? error.data.message : error.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState = {
  currentOrder: null,
  status: 'idle', // For createOrder
  error: null,    // For createOrder
  allOrders: [], // NEW: For storing all fetched orders
  fetchAllStatus: 'idle', // NEW: 'idle' | 'loading' | 'succeeded' | 'failed' for fetchAllOrders
  fetchAllError: null,   // NEW: For fetchAllOrders errors
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Optional: a reducer to clear the current order if needed, e.g., when navigating away
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.status = 'idle';
      state.error = null;
    },
    // Optional: a reducer to clear allOrders if needed
    clearAllOrders: (state) => {
        state.allOrders = [];
        state.fetchAllStatus = 'idle';
        state.fetchAllError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload; // Store the created order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Failed to create order';
      })
      // NEW: Cases for fetchAllOrders
      .addCase(fetchAllOrders.pending, (state) => {
        state.fetchAllStatus = 'loading';
        state.fetchAllError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.fetchAllStatus = 'succeeded';
        state.allOrders = action.payload; // Store the array of orders
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.fetchAllStatus = 'failed';
        state.fetchAllError = action.payload ? action.payload.message : 'Failed to fetch orders';
      });
  },
});

// Export new action if added
export const { clearCurrentOrder, clearAllOrders } = orderSlice.actions;
export default orderSlice.reducer;
