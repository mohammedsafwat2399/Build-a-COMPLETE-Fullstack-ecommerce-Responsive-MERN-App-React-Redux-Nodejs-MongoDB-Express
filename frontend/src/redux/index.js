import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
const Store = configureStore({
  reducer: { user: userSlice, product: productSlice },
});

export default Store;
