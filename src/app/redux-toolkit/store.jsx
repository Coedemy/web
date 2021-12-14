import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import courseSlice from './slices/courseSlice'
import userSlice from './slices/userSlice'

const rootReducer = {
  auth: authReducer,
  course: courseSlice,
  user: userSlice
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store