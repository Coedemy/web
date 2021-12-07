import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography, TextField, Icon } from '@mui/material'

import CourseItem from '../CourseItem'
import AppLayout from '../../Layout/AppLayout'

const Wishlist = () => {
  const { myLearning } = useSelector((state) => state.user)

  return (
    <AppLayout>
      <Box sx={{ marginBottom: 4 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Box>
          <TextField
            variant='outlined'
            placeholder='Find a product'
            size='small'
            fullWidth
            InputProps={{
              startAdornment: (
                <Icon className='mr-3' fontSize='small'>
                  search
                </Icon>
              ),
            }}
          />
        </Box>
      </Box>
      <Box sx={{ marginBottom: 4 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {
            myLearning.map((course, index) => ((
              <Grid item xs={4} key={course._id}>
                <CourseItem course={course} index={index} />
              </Grid>
            )))
          }
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 4 }} />
    </AppLayout>
  )
}

export default Wishlist
