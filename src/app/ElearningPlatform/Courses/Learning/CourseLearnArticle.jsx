import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

// import { trackTime } from 'app/redux-toolkit/slices/lectureSlice'

const LECTURE_HEIGHT = 600

const CourseLearnArticle = ({ content }) => {
  const dispatch = useDispatch()
  const lectureReducer = useSelector(state => state.lecture)

  const LectureContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `${LECTURE_HEIGHT}px`,
    backgroundColor: '#f7f7f7'
  }))

  return (
    <LectureContainer>
      {content}
    </LectureContainer>
  )
}

export default CourseLearnArticle