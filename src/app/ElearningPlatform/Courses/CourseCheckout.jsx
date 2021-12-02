import React from 'react'
import { Box, Button } from '@mui/material'

const CourseCheckout = ({ courseImage }) => {

  return (
    <Box>
      <img style={{ width: '100%' }} src={courseImage} />
      <Box sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button sx={{ width: '80%' }} variant="contained" color="secondary">Add To Cart</Button></Box>
      <Box sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button sx={{ width: '80%' }} variant="outlined" color="secondary">Buy Out</Button></Box>
    </Box>
  )
}

export default CourseCheckout
