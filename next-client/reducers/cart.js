import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:{}
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state,action) => {
      console.log(action.payload);
      state.value[action.payload.product] = state.value[action.payload.product] ? state.value[action.payload.product] + 1 : 1
    },
    remove: (state,action) => {
        if(state.value[action.payload.product] === 1)
            delete state.value[action.payload.product]
        else
            state.value[action.payload.product] = state.value[action.payload.product] - 1
    },
    clear: (state) => {
      state.value = {}
    }
  }
})

// Action creators are generated for each case reducer function
export const { add, remove, clear } = cartSlice.actions

export default cartSlice.reducer