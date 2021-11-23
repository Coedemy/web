import {
  GET_COURSES_LIST,
  GET_CATEGORIES_LIST,
  GET_COURSE_DETAIL,
  GET_COURSE_CONTENT
} from '../actions/courseActions'

const initialState = {
  coursesList: [],
  courseCategoriesList: [],
}

const courseReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSES_LIST: {
      return {
        ...state,
        coursesList: [...action.payload],
      }
    }
      
    case GET_CATEGORIES_LIST: {
      return {
        ...state,
        courseCategoriesList: [...action.payload],
      }
    }
      
    default: {
      return {
        ...state,
      }
    }
  }
}

export default courseReducer
