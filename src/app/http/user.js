import httpRequest from './httpRequest'

export const loadCartRequest = (cart) => {
  console.log('load cart')
  return httpRequest({ endpoint: '/users/cart', method: 'post', bodyParameters: cart, requireToken: true })
}

export const updateCartRequest = (courseId) => {
  console.log('update cart')
  return httpRequest({ endpoint: '/users/cart', method: 'patch', bodyParameters: courseId, requireToken: true })
}

export const loadAuthenticatedUserPropertiesRequest = () => {
  console.log('load authenticated user properties')
  return httpRequest({ endpoint: '/users/auth-user-properties', requireToken: true })
}

export const toggleFavoriteRequest = (payload) => {
  console.log('toggle favorite')
  return httpRequest({ endpoint: '/users/favorite', method: 'patch', bodyParameters: payload, requireToken: true })
}

export const loadMyTeachingCoursesRequest = () => {
  console.log('load my teaching courses')
  return httpRequest({ endpoint: '/users/teaching', requireToken: true })
}

export const finishLectureRequest = ({ lectureId }) => {
  console.log('learn lecture')
  return httpRequest({ endpoint: `/users/learn/${lectureId}`, method: 'post', requireToken: true })
}