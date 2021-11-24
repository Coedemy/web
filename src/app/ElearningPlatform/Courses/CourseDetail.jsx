import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import AppLayout from '../Layout/AppLayout'
import CourseBanner from './CourseBanner'
import CourseGoal from './CourseGoal'
import CourseContent from './CourseContent'

const CourseDetail = () => {
  const location = useLocation()
  const { course } = location.state

  console.log(location)
  return (
    <Box>
      <AppLayout>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <CourseBanner course={course} />
            <CourseGoal course={course} />
            <CourseContent course={course} />
          </Grid>
          <Grid item xs={3}>
            This is {course._id}
            <Grid item>
              <img style={{ width: '100%' }} src={course.courseImage} />
            </Grid>
          </Grid>
        </Grid>
      </AppLayout>
    </Box>
  )
}

export default CourseDetail
