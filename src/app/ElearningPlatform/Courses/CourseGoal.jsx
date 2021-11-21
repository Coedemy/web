import React from 'react'
import { Box, Grid, Typography, Rating } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

const CourseGoal = () => {

  return (
    <Grid container spacing={2} style={{ border: '1px solid lightgray', padding: 32, paddingTop: 16, marginTop: 32 }}>
      <Grid item xs={12}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>What you'll learn</Typography>
        <Box sx={{ mb: 4 }} />
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Learn to use Python professionally, learning both Python 2 and Python 3!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Learn advanced Python features, like the collections module and how to work with timestamps!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Create games with Python, like Tic Tac Toe and Blackjack!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Build a complete understanding of Python from the ground up!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Learn to use Python professionally, learning both Python 2 and Python 3!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Learn advanced Python features, like the collections module and how to work with timestamps!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Create games with Python, like Tic Tac Toe and Blackjack!</Typography>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckIcon />
            <Typography style={{ wordWrap: "break-word" }}>Build a complete understanding of Python from the ground up!</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  )
}

export default CourseGoal
