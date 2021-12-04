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
    loadUserProperties: (state, action) => {
      const cartJSON = localStorage.getItem('cart')
      try {
        const cart = JSON.parse(cartJSON)
        if (cart) {
          state.cart = [...cart]
        }
        else {
          localStorage.setItem('cart', JSON.stringify([]))
          state.cart = []
        }
      }
      catch (err) {
        localStorage.setItem('cart', JSON.stringify([]))
        state.cart = []
      }
      state.isLoading = false

      return state
    },

    addToCart: (state, action) => {
      const { item } = action.payload
      const cartJSON = localStorage.getItem('cart')
      try {
        const cart = JSON.parse(cartJSON)

        cart.push(item)

        localStorage.setItem('cart', JSON.stringify(cart))
        state.cart = cart
      }
      catch {
        localStorage.setItem('cart', JSON.stringify([item]))
        state.cart = [item]
      }
      return state
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload
      const cartJSON = localStorage.getItem('cart')
      try {
        let cart = JSON.parse(cartJSON)
        if (!cart) cart = []
        cart = cart.filter(course => course._id !== id)

        localStorage.setItem('cart', JSON.stringify(cart))
        state.cart = cart
      }
      catch {
        localStorage.setItem('cart', JSON.stringify([]))
        state.cart = []
      }
      return state
    }
  }
})

const { reducer, actions } = userSlice
export const {
  loadUserProperties,
  addToCart,
  removeFromCart
} = actions
export default reducer