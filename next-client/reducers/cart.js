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
      const findProduct = state.value.products.find(item=>item.product === action.payload.product)
      if(findProduct){
        findProduct.quantity += 1
      }
      else{
        state.value.products.push({
          product: action.payload.product,
          data: action.payload.data,
          quantity: 1
        })
      }
      state.value.price += action.payload.price;
    },
    remove: (state, action) => {
      const findProduct = state.value.products.find(item=>item.product === action.payload.product)
      if(findProduct.quantity > 1){
        findProduct.quantity -= 1
      }
      else{
        state.value.products = state.value.products.filter(item=>item.product !== action.payload.product)
      }
      state.value.price -= action.payload.price;
      if(state.value.products.length === 0){
        state.value.price = 0
      }
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
