import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// import { trackTime } from 'app/redux-toolkit/slices/courseSlice'

const LECTURE_HEIGHT = 600

const CourseLearnArticle = ({ content }) => {
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
    overflowY: 'scroll'
  }))

  return (
    <LectureContainer>
      <Article>
        {
          !lectureReducer.isLoading ? (
            <>
              <Typography variant='h3'>Lorem Ipsum</Typography>
              <Typography variant='h4'>1. Lorem Ipsum</Typography>
              {content}
              <Typography variant='h4'>2. Lorem Ipsum</Typography>
              {content}
              <Typography variant='h4'>2. Lorem Ipsum</Typography>
              {content}
            </>
          ) : <></>
        }
      </Article>
    </LectureContainer>
  )
}

export default CourseLearnArticle