import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Box } from '@mui/material'

import CourseItem from './CourseItem'

import { getCoursesList, getCourseDetail } from 'app/redux/actions/courseActions'

const CoursesList = ({ courses }) => {

  const courseReducer = useSelector(state => state.courses)
  const dispatch = useDispatch()
  const history = useHistory()

  const chooseCourse = async (courseId) => {
    dispatch(getCourseDetail(courseId))
  }

  useEffect(() => {
    dispatch(getCoursesList())
  }, [])

  useEffect(() => {
    const currentCourse = courseReducer.currentCourse
    if (Object.keys(currentCourse).length !== 0) {
      console.log(currentCourse)
      history.push({
        pathname: `/courses/${currentCourse._id}`,
        state: {
          course: currentCourse
        }
      })
    }
  }, [courseReducer.currentCourse])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {
          courseReducer.coursesList.map(course => ((
            <Grid item xs={4} key={course._id} onClick={chooseCourse.bind(this, course._id)}>
              <CourseItem course={course} />
            </Grid>
          )))
        }
      </Grid>
    </Box>
  )
}

export default CoursesList