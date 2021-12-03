import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import lectureSlice from './slices/lectureSlice'
import userSlice from './slices/userSlice'

const rootReducer = {
  auth: authReducer,
  lecture: lectureSlice,
  user: userSlice
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store