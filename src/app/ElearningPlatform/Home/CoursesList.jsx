import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Grid, Box } from '@mui/material'

import { getCoursesList } from 'app/http/course'
import { MatxLoading } from 'app/components'

import CourseItem from './CourseItem'


const CoursesList = ({ filterCategoryId }) => {

  const { data, isLoading } = useQuery('courseList', getCoursesList)
  const [filterdCourses, setFilteredCourses] = useState([])

  useEffect(() => {
    if (isLoading) return
    setFilteredCourses(data.courses)
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    if (filterCategoryId === '') setFilteredCourses(data.courses)
    else setFilteredCourses(data.courses.filter(course => course.category._id === filterCategoryId))
  }, [filterCategoryId])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {
          isLoading ? <MatxLoading /> : (
            filterdCourses.map((course, index) => ((
              <Grid item xs={4} key={course._id}>
                <CourseItem course={course} index={index} />
              </Grid>
            )))
          )
        }
      </Grid>
    </Box >
  )
}

export default CoursesList