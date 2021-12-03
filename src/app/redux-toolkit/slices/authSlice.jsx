import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    accessToken: null,
    user: {
      email: null,
      username: null,
      userId: null
    },
    error: null,
  },
  reducers: {
    startLogin: (state, action) => {
      state.isLoading = true
    },

    loginSuccess: (state, action) => {
      const { user, accessToken } = action.payload
      const { username, _id, email, userId, profile } = user
      state = {
        isLoading: false,
        error: null,
        accessToken,
        user: { userId: userId || _id, username, email }
      }

      localStorage.setItem('userInfo', JSON.stringify(state))
      return state
    },

    loginFail: (state, { error }) => {
      state = {
        isLoading: false,
        username: null,
        userId: null,
        accessToken: null,
        error,
      }
      return state
    },

    logout: (state) => {
      state = {
        isLoading: false,
        user: null,
        accessToken: null,
        error: null,
      }
      console.log("SA logou")
      localStorage.removeItem('userInfo')
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
  startLogin,
  loginSuccess,
  loginFail,
  logout,
  changeProfile,
} = actions
export default reducer