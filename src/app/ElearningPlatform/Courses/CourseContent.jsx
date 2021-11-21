import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CourseSectionsList from './CourseSectionsList'

const CourseContent = () => {

  const theme = useTheme()
  return (
    <Grid container spacing={2} style={{ border: '1px solid lightgray', padding: 32, paddingTop: 16, marginTop: 32 }}>
      <Grid item xs={12}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>Course Content</Typography>
        <Box sx={{ mb: 2 }} />
        <Typography variant='body2'>2 sections | 3 lectures</Typography>
        <Box sx={{ mb: 2 }} />
        <CourseSectionsList />

      </Grid>
    </Grid >
  )
}

export default CourseContent
