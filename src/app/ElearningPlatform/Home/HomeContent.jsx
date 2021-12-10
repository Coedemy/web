import React from 'react'
import { Box } from '@mui/material'

import BestSellerCoursesList from './BestSellerCoursesList'
import HighRatingCoursesList from './HighRatingCoursesList'

import MyLearning from './MyCourses/MyLearning'

const gap = 8

const HomeContent = () => {
  return (
    <Box>
      <BestSellerCoursesList />
      <Box sx={{ marginBottom: gap }} />
      <HighRatingCoursesList />
      <Box sx={{ marginBottom: gap }} />
    </Box>
  )
}

export default HomeContent
