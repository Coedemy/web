import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import { Box, Grid } from '@mui/material'

import { searchCourse } from 'app/http/course'
import { MatxLoading } from 'app/components'

import AppLayout from '../Layout/AppLayout'
import CourseBanner from './CourseBanner'
import CourseGoal from './CourseGoal'
import CourseCurriculum from './CourseCurriculum'
import CourseInfo from './CoursesInfo';

const CourseDetail = () => {

  const { slug } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug } }))
  console.log({ isLoading, data })

  return (
    <AppLayout>
      <Helmet>
        <title>{data && data.course ? data.course.title : ''}</title>
        <meta name='Course Detail' content='Course Detail' />
      </Helmet>
      {
        isLoading ? <MatxLoading /> : data.course === undefined ? <Redirect to='/404' /> : (
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <CourseBanner course={data.course} />
              <CourseGoal course={data.course} />
              <CourseCurriculum course={data.course} />
            </Grid>
            <Grid item xs={3}>
              <CourseInfo course={data.course} />
            </Grid>
          </Grid>
        )
      }
    </AppLayout>
  )
}

export default CourseDetail
