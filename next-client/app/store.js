import {
  configureStore,
} from '@reduxjs/toolkit'
import cartReducer from '../reducers/cart'
import walletReducer from '../reducers/wallet'

export default configureStore({
  reducer: {
    cart:cartReducer,
    wallet:walletReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})