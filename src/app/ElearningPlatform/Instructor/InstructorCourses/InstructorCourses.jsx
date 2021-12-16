import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Box, Card, CardContent, TextField, Typography, CardMedia } from '@mui/material'

import AppLayout from 'app/ElearningPlatform/Layout/AppLayout'
import InstructorCreateCourse from './InstructorCreateCourse'

const myTeachingCourses = [
  {
    id: 131244,
    title: 'PHP and Web Development',
    courseImage: 'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/56HSrFc0SF6eyjrGXgVZ'
  },
  {
    id: 213413,
    title: 'Data Analytics',
    courseImage: 'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/56HSrFc0SF6eyjrGXgVZ'
  },
  {
    id: 3415351,
    title: 'Microsoft Office',
    courseImage: 'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/56HSrFc0SF6eyjrGXgVZ'
  },
]

const InstructorCourses = () => {
  return (
    <AppLayout>
      <Helmet>
        <title>Coedemy</title>
        <meta name='Coedemy' content='Coedemy' />
      </Helmet>
      <Box sx={{ mt: 10 }} />
      {
        myTeachingCourses.length === 0 ? (
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
              myTeachingCourses.map(course => (
                <Box key={course.id} sx={{ mt: 4 }}>
                  <Link to={`/instructor/courses/${course.id}/manage/goals`}>
                    <Card sx={{ p: 0 }} elevation={4}>
                      {/* <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> */}
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ mr: 4 }}>
                          <CardMedia
                            component='img'
                            alt="course's image"
                            height='100'
                            width='100'
                            image='https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/56HSrFc0SF6eyjrGXgVZ'
                            sx={{ border: '1px solid lightgray' }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'space-around', height: '100px' }}>
                          <Typography variant='h6'><Box sx={{ fontWeight: 'bold' }}>{course.title}</Box></Typography>
                          <Box sx={{ fontWeight: 'bold' }}>DRAFT</Box>
                        </Box>
                      </Box>
                      {/* </CardContent> */}
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