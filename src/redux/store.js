import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./likeSlice";
import cartReducer from "./cartSlice"; 
const store = configureStore({
  reducer: {
    likes: likeReducer,
    cart: cartReducer, 
  },
});

export default store;
