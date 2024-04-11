import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./app/redux/CartReducer.js";

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
