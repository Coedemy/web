import React from 'react'
import { Box, Typography } from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'

const CourseLearnResources = ({ course }) => {
  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
      <IosShareIcon fontSize='small' />&nbsp;
      <Typography><a href='https://mui.com/components/material-icons' target='_blank'>Mui document</a></Typography>
    </Box>
  )
}

export default CourseLearnResources
