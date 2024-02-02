import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      toast("Item Add Successfully");
      if (check) {
        toast("Already Item in cart");
      } else {
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, quty: 1, total },
        ];
      }
    },
    deletedCartItem: (state, action) => {
      toast("one Item Deleted");
      state.cartItem = state.cartItem.filter((el) => el._id !== action.payload);
      // const index = state.cartItem.findIndex(el => el._id === action.payload)
      // state.cartItem.splice(index,1)
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let quty = state.cartItem[index].quty;
      const qutyInc = ++quty;
      state.cartItem[index].quty = qutyInc;
      const price = state.cartItem[index].price;
      const total = price * qutyInc;
      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let quty = state.cartItem[index].quty;
      const qutyDec = --quty;
      if (qutyDec > 1) {
        state.cartItem[index].quty = qutyDec;
        const price = state.cartItem[index].price;
        const total = price * qutyDec;
        state.cartItem[index].total = total;
      }
    },
  },
});
export const {
  setDataProduct,
  deletedCartItem,
  addCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;
export default productSlice.reducer;
