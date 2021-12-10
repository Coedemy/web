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
    loadAuthenticatedUserProperties: (state, action) => {
      state.isLoading = true
      const userProps = action.payload
      if (userProps) {
        console.log({ userProps })
        state.wishlist = userProps.wishlist
        state.myLearning = userProps.myLearning
      }
      state.isLoading = false

      return state
    },

    checkout: (state, action) => {
      state.isLoading = true
      const { myLearning } = action.payload
      state.myLearning = myLearning
      state.cart = []
      state.isLoading = false
    },

    loadCart: (state, action) => {
      state.isLoading = true
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
    },

    toggleFavorite: (state, action) => {
      const { course } = action.payload
      const { wishlist } = state
      const filterWishlist = wishlist.filter(c => c._id !== course._id)
      if (wishlist.length === filterWishlist.length) {
        filterWishlist.push(course)
      }
      state.wishlist = filterWishlist
      return state
    }
  }
})

const { reducer, actions } = userSlice
export const {
  loadAuthenticatedUserProperties,
  toggleFavorite,
  loadCart,
  addToCart,
  removeFromCart,
  checkout
} = actions
export default reducer