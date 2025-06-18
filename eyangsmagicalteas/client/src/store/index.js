import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice"; // Import the new order reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer, // Add the order reducer
  },
});

export default store;