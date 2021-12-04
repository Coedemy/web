import httpRequest from './httpRequest'

export const initializeUserProperties = (cart) => {
  console.log('initializeUserProperties')
  return httpRequest({ endpoint: '/users/properties', method: 'post', bodyParameters: cart, requireToken: true })
}