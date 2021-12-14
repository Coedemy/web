import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { MatxLoading } from 'app/components'

// import { trackTime } from 'app/redux-toolkit/slices/courseSlice'

const LECTURE_HEIGHT = 600

const CourseInitialization = () => {
  const lectureReducer = useSelector(state => state.course)

  const LectureContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `${LECTURE_HEIGHT}px`,
    backgroundColor: '#f7f7f7'
  }))

  return (
    <LectureContainer>
      <MatxLoading />
    </LectureContainer>
  )
}

export default CourseInitialization