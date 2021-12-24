import httpRequest from './httpRequest'
import queryString from 'query-string'
import { post } from 'qwest'

export const getCoursesList = () => {
  console.log('Courses List')
  return httpRequest({ endpoint: '/courses' })
}

export const getCategoriesList = () => {
  console.log('Categories List')
  return httpRequest({ endpoint: '/courses/categories' })
}

export const searchCourse = ({ queries, userId }) => {
  console.log('Course Detail')
  return httpRequest({ endpoint: `/courses/detail?${queryString.stringify(queries)}`, method: 'post', bodyParameters: { userId } })
}

export const checkoutRequest = (payload) => {
  console.log('Checkout')
  return httpRequest({ endpoint: `/orders/checkout`, method: 'post', bodyParameters: payload, requireToken: true })
}

export const createCourseRequest = (course) => {
  return httpRequest({ endpoint: `/courses`, method: 'post', bodyParameters: course, requireToken: true })
}

export const updateCourseRequest = ({ courseId, updatedCourse, isFormData }) => {
  console.log('Update Course')
  return httpRequest({ endpoint: `/courses/${courseId}`, method: 'patch', bodyParameters: updatedCourse, isFormData, requireToken: true })
}