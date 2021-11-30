import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Grid, Box } from '@mui/material'

import { getCoursesList } from 'app/http/course'
import { MatxLoading } from 'app/components'

import CourseItem from './CourseItem'


const CoursesList = ({ courses }) => {

  const { data, isLoading } = useQuery('courseList', getCoursesList)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {
          isLoading ? <MatxLoading /> : (
            data?.courses.map(course => ((
              <Grid item xs={4} key={course._id}>
                <Link to={`/courses/${course.slug}`}>
                  <CourseItem course={course} />
                </Link>
              </Grid>
            )))
          )
        }
      </Grid>
    </Box >
  )
}

export default CoursesList