import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cart'

export default configureStore({
  reducer: {
    cart:cartReducer
  }
})