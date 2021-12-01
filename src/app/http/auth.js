import httpRequest from './httpRequest'

export const loginWithEmail = (user) => {
  console.log('Login with Email')
  return httpRequest({ endpoint: '/auth/login', method: 'post', bodyParameters: user })
}

export const signupWithEmail = (user) => {
  console.log('Sign up with Email')
  return httpRequest({ endpoint: '/auth/register', method: 'post', bodyParameters: user })
}

export const loginWithGmail = ({ queries }) => {
  // console.log('Course Detail')
  // return httpRequest({ endpoint: `/courses/detail?${queryString.stringify(queries)}` })
}

export const loginWithFacebook = ({ queries }) => {
  console.log('Login with Facebook')
  return httpRequest({ endpoint: `/auth/facebook` })
}