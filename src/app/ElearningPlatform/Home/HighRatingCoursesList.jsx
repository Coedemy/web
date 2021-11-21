import React from 'react'
import { Typography, Grid } from '@mui/material'

import CourseItem from './CourseItem'
import coursesDataList from '../fakeData/coursesDataList'

const gap = 8

const HighRatingCoursesList = () => {
  console.log(coursesDataList)
  return (
    <div>
      <Typography variant='h5' color='text.secondary' style={{ fontWeight: 600, marginBottom: 2 * gap }}>Students are viewing</Typography>
      <Grid container spacing={3}>
        {
          coursesDataList.slice(0, 6).map(course => (
            <Grid item xs={3} key={course.id}>
              <CourseItem course={course} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default HighRatingCoursesList