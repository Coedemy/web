import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import crypto from 'crypto'

const CourseGoal = ({ course }) => {

  return (
    <Grid container spacing={2} style={{ border: '1px solid lightgray', padding: 32, paddingTop: 16, marginTop: 32 }}>
      <Grid item xs={12}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>What you'll learn</Typography>
        <Box sx={{ mb: 4 }} />
        <Grid container spacing={2}>
          {
            course.learningGoals.map(goal => (
              <Grid item xs={6} key={crypto.randomBytes(16).toString('hex')} style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckIcon />
                <Typography style={{ wordWrap: 'break-word' }}>{goal}</Typography>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Grid >
  )
}

export default CourseGoal
