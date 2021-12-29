import httpRequest from './httpRequest'
import queryString from 'query-string'
import { post } from 'qwest'

export const getCoursesList = () => {
  console.log('Courses List')
  return httpRequest({ endpoint: '/courses' })
}

export const getCategoriesListRequest = () => {
  console.log('Categories List')
  return httpRequest({ endpoint: '/courses/categories' })
}

export const searchCourseRequest = ({ queries, userId }) => {
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

export const reviewCourseRequest = ({ courseId, numberOfStars, comment }) => {
  console.log('review course')
  return httpRequest({ endpoint: `/courses/${courseId}/review`, method: 'post', bodyParameters: { numberOfStars, comment }, requireToken: true })
}

export const createSectionRequest = ({ courseId, title }) => {
  console.log('create section request')
  return httpRequest({ endpoint: `/courses/${courseId}/sections`, method: 'post', bodyParameters: { title }, requireToken: true })
}

export const deleteSectionRequest = () => {
  console.log('delete section request')

}

export const updateSectionContentRequest = () => {
  console.log('update section content request')
}

export const updateSectionsOrderRequest = ({ courseId, sourceIndex, destIndex }) => {
  console.log('update sections order request')
  console.log({ courseId, sourceIndex, destIndex })
  return httpRequest({ endpoint: `/courses/${courseId}/reorder`, method: 'patch', bodyParameters: { sourceIndex, destIndex }, requireToken: true })
}

export const createLectureRequest = ({ sectionId, title }) => {
  console.log('create lecture request')
  return httpRequest({ endpoint: `/courses/sections/${sectionId}/lectures`, method: 'post', bodyParameters: { title }, requireToken: true })
}

export const deleteLectureRequest = () => {
  console.log('delete lecture request')
}

export const updateLecureContentRequest = ({ lectureId, lectureContent, isFormData }) => {
  console.log('update lecture content request')
  return httpRequest({ endpoint: `/courses/lectures/${lectureId}`, method: 'post', bodyParameters: lectureContent, isFormData: true, requireToken: true })
}

export const updateLecturesOrderRequest = ({ sectionId, sourceIndex, destIndex }) => {
  console.log('update lectures order request')
  return httpRequest({ endpoint: `/courses/sections/${sectionId}/reorder`, method: 'patch', bodyParameters: { sourceIndex, destIndex }, requireToken: true })
}

export const getCourseSectionsRequest = ({ courseId }) => {
  console.log('get course section request')
  return httpRequest({ endpoint: `/courses/${courseId}/sections` })
}

export const publishCourseRequest = ({ courseId }) => {
  console.log('publish course')
  return httpRequest({ endpoint: `/courses/${courseId}/publish`, method: 'post', requireToken: true })
}