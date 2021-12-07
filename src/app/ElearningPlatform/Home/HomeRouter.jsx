import React from 'react'

const homeRouter = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('./Home'))
  },
  {
    path: '/my-courses',
    component: React.lazy(() => import('./MyCourses/MyCourses'))
  },
  {
    path: '/cart',
    exact: true,
    component: React.lazy(() => import('./ShoppingCart'))
  },
  {
    path: '/cart/checkout',
    exact: true,
    component: React.lazy(() => import('./Checkout'))
  }
]

export default homeRouter
