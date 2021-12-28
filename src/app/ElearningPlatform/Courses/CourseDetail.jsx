import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import { Box, Grid, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import crypto from 'crypto'

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

              {/* <Grid container spacing={2} style={{ border: '1px solid lightgray', padding: 32, paddingTop: 16, marginTop: 32 }}>
                <Grid item xs={12}>
                  <Typography variant='h5' style={{ fontWeight: 'bold' }}>Student feedback</Typography>
                  <Box sx={{ mb: 4 }} />
                  <Grid container spacing={2}>
                    {
                      data.course.learningGoals.map(goal => (
                        <Grid item xs={6} key={crypto.randomBytes(16).toString('hex')} style={{ display: 'flex', flexDirection: 'row' }}>
                          <CheckIcon />
                          <Typography style={{ wordWrap: 'break-word' }}>{goal}</Typography>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Grid>
              </Grid > */}

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
