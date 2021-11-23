import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Box } from '@mui/material'

import CourseItem from './CourseItem'

import { getCoursesList } from 'app/redux/actions/courseActions'

const CoursesList = ({ courses }) => {

  const courseReducer = useSelector(state => state.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoursesList())
  }, [])

  console.log(courseReducer)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {
          courseReducer.coursesList.map(course => ((
            <Grid item xs={4} key={course._id}>
              <CourseItem course={course} />
            </Grid>
          )))
        }
      </Grid>
    </Box>
  )
}

export default CoursesList