import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Box, Grid } from '@mui/material'

import { searchCourse } from 'app/http/course'
import { MatxLoading } from 'app/components'

import AppLayout from '../Layout/AppLayout'
import CourseBanner from './CourseBanner'
import CourseGoal from './CourseGoal'
import CourseCurriculum from './CourseCurriculum'

const CourseDetail = () => {

  const { slug } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug } }))

  return (
    <Box>
      <AppLayout>
        {
          isLoading ? <MatxLoading /> : (
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <CourseBanner course={data.course} />
                <CourseGoal course={data.course} />
                <CourseCurriculum course={data.course} />
              </Grid>
              <Grid item xs={3}>
                This is {data.course._id}
                <Grid item>
                  <img style={{ width: '100%' }} src={data.course.courseImage} />
                </Grid>
              </Grid>
            </Grid>
          )
        }
      </AppLayout>
    </Box>
  )
}

export default CourseDetail
