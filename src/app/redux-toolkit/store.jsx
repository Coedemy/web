import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'

const rootReducer = {
  auth: authReducer
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store