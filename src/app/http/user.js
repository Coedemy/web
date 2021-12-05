import httpRequest from './httpRequest'

export const initCart = (cart) => {
  console.log('init cart')
  return httpRequest({ endpoint: '/users/cart', method: 'post', bodyParameters: cart, requireToken: true })
}

export const updateCart = (courseId) => {
  console.log('update cart')
  return httpRequest({ endpoint: '/users/cart', method: 'patch', bodyParameters: courseId, requireToken: true })
}

