import React from 'react'

const homeRouter = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('./HomePage'))
  },
  {
    path: '/wishlist',
    exact: true,
    component: React.lazy(() => import('./WishlistPage'))
  },
  {
    path: '/cart',
    exact: true,
    component: React.lazy(() => import('./ShoppingCartPage'))
  },
  {
    path: '/cart/checkout',
    exact: true,
    component: React.lazy(() => import('./Checkout'))
  }
]

export default homeRouter
