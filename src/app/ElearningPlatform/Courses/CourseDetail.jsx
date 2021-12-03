import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import AppLayout from '../Layout/AppLayout'
import CourseBanner from './CourseBanner'
import CourseGoal from './CourseGoal'
import CourseContent from './CourseContent'
import CourseInfo from './CoursesInfo'

const CourseDetail = () => {
  const location = useLocation()
  const { courseId, courseImage } = location.state

  return (
    <Box>
      <AppLayout>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CourseBanner />
            <CourseGoal />
            <CourseContent />
          </Grid>
          <Grid item xs={4}>
            <CourseInfo />
          </Grid>
        </Grid>
      </AppLayout>
    </Box>
  )
}

export default CourseDetail
