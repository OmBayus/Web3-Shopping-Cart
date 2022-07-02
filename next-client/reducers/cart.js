import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    products: [],
    price: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const findProduct = state.value.products.find(item=>item.productId === action.payload.product)
      if(findProduct){
        findProduct.quantity += 1
      }
      else{
        state.value.products.push({
          productId: action.payload.product,
          quantity: 1
        })
      }
      state.value.price += action.payload.price;
    },
    remove: (state, action) => {
      const findProduct = state.value.products.find(item=>item.productId === action.payload.product)
      if(findProduct.quantity > 1){
        findProduct.quantity -= 1
      }
      else{
        state.value.products = state.value.products.filter(item=>item.productId !== action.payload.product)
      }
      state.value.price -= action.payload.price;
    },
    clear: (state) => {
      state.value.products = [];
      state.value.price = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
