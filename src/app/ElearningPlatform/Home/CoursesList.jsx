import * as React from 'react'
import { Grid, Box } from '@mui/material'

import CourseItem from './CourseItem'

const CoursesList = ({ courses }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {
          courses.map(course => (
            <Grid item xs={4} key={course.id}>
              <CourseItem course={course} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

export default CoursesList