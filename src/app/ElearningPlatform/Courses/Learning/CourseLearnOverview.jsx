import React from 'react'
import { Box, Typography, Divider, Button } from '@mui/material'

const CourseLearnOverview = ({ course }) => {
  console.log({course})
  return (
    <Box>
      <Typography variant='h5' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
        About this course
      </Typography>
      <Typography variant='body1' gutterBottom>
        {course.subtitle}
      </Typography>
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' gutterBottom>By the numbers</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' gutterBottom>Skill level: All Levels</Typography>
          <Typography variant='body1' gutterBottom>Students: 61597</Typography>
          <Typography variant='body1' gutterBottom>Languages: {course.language}</Typography>
          <Typography variant='body1' gutterBottom>Captions: Yes</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' gutterBottom>Lectures: {course.totalLectures}</Typography>
          <Typography variant='body1' gutterBottom>Video: {parseFloat(course.totalHours / 3600).toFixed(1)} total hours</Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' gutterBottom>Certificates</Typography>
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant='body1' gutterBottom>Get Coedemy certificate by completing entire course</Typography>
          <Button variant='outlined'>Coedemy certificate</Button>
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' gutterBottom>Descriptions</Typography>
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant='body1' gutterBottom>{course.description}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' gutterBottom>Instructor</Typography>
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant='body1' gutterBottom>Skill level: All Levels</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseLearnOverview
