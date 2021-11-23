import httpRequest from 'app/httpRequest'

export const GET_COURSES_LIST = 'GET_COURSES_LIST'
export const GET_CATEGORIES_LIST = 'GET_CATEGORIES_LIST'
export const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL'
export const GET_COURSE_CONTENT = 'GET_COURSE_CONTENT'

export const getCoursesList = () => (dispatch) => {
  console.log("Courses List")
  httpRequest({ endpoint: '/courses' }).then((res) => {
    dispatch({
      type: GET_COURSES_LIST,
      payload: res.data.courses,
    })
  })
}

export const getCategoriesList = () => (dispatch) => {
  httpRequest({ endpoint: '/courses/categories'}).then((res) => {
    dispatch({
      type: GET_CATEGORIES_LIST,
      payload: res.data,
    })
  })
}

export const getCourseDetail = (id) => (dispatch) => {
  // httpRequest({ endpoint: `/courses/${id}`}).then((res) => {
  //   dispatch({
  //     type: GET_COURSE_DETAIL,
  //     payload: res.data,
  //   })
  // })
}