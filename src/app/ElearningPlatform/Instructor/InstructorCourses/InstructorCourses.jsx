import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Box, Card, CardContent, TextField, Typography, CardMedia } from '@mui/material'

import AppLayout from 'app/ElearningPlatform/Layout/AppLayout'
import { MatxLoading } from 'app/components'
import { loadMyTeachingCoursesRequest } from 'app/http/user'
import InstructorCreateCourse from './InstructorCreateCourse'

const InstructorCourses = () => {
  const { data, isLoading } = useQuery('myTeaching', loadMyTeachingCoursesRequest)

  return (
    <AppLayout>
      <Helmet>
        <title>Coedemy</title>
        <meta name='Coedemy' content='Coedemy' />
      </Helmet>
      <Box sx={{ mt: 10 }} />
      {
        isLoading ? <MatxLoading />
          : data.myTeaching.length === 0 ? (
            <Card sx={{ p: 4 }} elevation={4}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Jump into Course Creation</Typography>
                <InstructorCreateCourse label='Create a course' />
              </CardContent>
            </Card>
          ) : (
            <Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField size='small' placeholder='Search your courses' />
                  <InstructorCreateCourse label='New course' />
                </Box>
              </Box>
              <Box sx={{ mb: 10 }} />
              {
                data.myTeaching.map((course, index) => (
                  <Box key={course._id} sx={{ mt: 4 }}>
                    <Link to={`/instructor/courses/${course._id}/manage/goals`}>
                      <Card sx={{ p: 0 }} elevation={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ mr: 4 }}>
                            <CardMedia
                              component='img'
                              alt="course's image"
                              image={data.myTeaching[index].courseImage}
                              sx={{ border: '1px solid lightgray', width: '150px', height: '100px' }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'space-around', height: '100px' }}>
                            <Typography variant='h6'><Box sx={{ fontWeight: 'bold' }}>{course.title}</Box></Typography>
                            <Box sx={{ fontWeight: 'bold' }}>DRAFT</Box>
                          </Box>
                        </Box>
                      </Card>
                    </Link>
                  </Box>
                ))
              }
            </Box>
          )
      }

      <Box sx={{ mt: 10 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant='h6'>Based on your experience, we think these resources will be helpful.</Typography></Box>
    </AppLayout>
  )
}

export default InstructorCourses