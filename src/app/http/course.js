import httpRequest from './httpRequest'
import queryString from 'query-string'

export const getCoursesList = () => {
  console.log("Courses List")
  return httpRequest({ endpoint: '/courses' })
}

export const getCategoriesList = () => {
  console.log("Categories List")
  return httpRequest({ endpoint: '/courses/categories' })
}

export const searchCourse = ({ queries }) => {
  console.log("Course Detail")
  return httpRequest({ endpoint: `/courses/detail?${queryString.stringify(queries)}` })
}