import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import lectureSlice from './slices/lectureSlice'

const rootReducer = {
  auth: authReducer,
  lecture: lectureSlice
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store