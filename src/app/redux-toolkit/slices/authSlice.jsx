import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    isAuthenticated: false,
    accessToken: null,
    user: {
      email: null,
      username: null,
      userId: null
    },
    error: null,
  },
  reducers: {
    startAuthenticate: (state, action) => {
      state.isAuthenticated = false
      state.isLoading = true
    },

    loginSuccess: (state, action) => {
      const { user, accessToken } = action.payload
      const { username, id, email, userId, profile } = user
      state = {
        isLoading: false,
        error: null,
        accessToken,
        isAuthenticated: true,
        user: { userId: userId || id, username, email }
      }

      return state
    },

    authenticateFail: (state, { error }) => {
      state = {
        isLoading: false,
        username: null,
        userId: null,
        accessToken: null,
        isAuthenticated: false,
        error,
      }
      return state
    },

    logout: (state) => {
      state = {
        isLoading: false,
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      }
      console.log('SA logout')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('cart')
      return state
    },

    changeProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
      state.username = action.payload.username
      localStorage.setItem('userInfo', JSON.stringify(state))
    },
  },
})

const { reducer, actions } = authSlice
export const {
  startAuthenticate,
  loginSuccess,
  authenticateFail,
  logout,
  changeProfile,
} = actions
export default reducer