import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, Link as MuiLink, Button } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { styled } from '@mui/material/styles'

// import { trackTime } from 'app/redux-toolkit/slices/courseSlice'

const LECTURE_HEIGHT = 600

const CourseLockedLecture = ({ course }) => {
  const lectureReducer = useSelector(state => state.course)

  const LectureContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `${LECTURE_HEIGHT}px`,
    backgroundColor: '#f7f7f7'
  }))

  const Article = styled(Box)(({ theme }) => ({
    paddingTop: '20px',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }))

  return (
    <LectureContainer>
      <Article>
        <LockIcon fontSize='large' />
        <Box sx={{ m: 2 }} />
        <Typography variant='h4'>Lecture content locked</Typography>
        <Box sx={{ m: 2 }} />
        <Box>
          <Button variant='outlined' sx={{ mr: 2 }}>Login</Button>
          <Button variant='contained'>Enroll this Course</Button>
        </Box>
      </Article>
    </LectureContainer>
  )
}

export default CourseLockedLecture