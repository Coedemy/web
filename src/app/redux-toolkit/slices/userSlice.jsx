import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: true,
    cart: [],
    wishlist: [],
    myLearning: [],
    error: null,
  },
  reducers: {
    loadCart: (state, action) => {
      const userInfoJSON = localStorage.getItem('userInfo')
      if (userInfoJSON) state.cart = JSON.parse(userInfoJSON).cart
      return state
    },

    addToCart: (state, action) => {
      const { item } = action.payload

      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo.cart) userInfo.cart = []
      userInfo.cart.push(item)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      state.cart = userInfo.cart
      return state
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload

      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      userInfo.cart.filter(item => item._id !== id)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      state.cart = userInfo.cart
      return state
    }
  }
})

const { reducer, actions } = userSlice
export const {
  loadCart,
  addToCart,
  removeFromCart
} = actions
export default reducer