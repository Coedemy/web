import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import Wishlist from './Wishlist'
import MyLearning from './MyLearning'

const MyCourses = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box>
      <Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, marginTop: 5, paddingTop: 30 }}>
        <Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>My Learning</Typography>
        <Box sx={{ width: '100%', typography: 'body1', color: 'white', display: 'flex', justifyContent: 'center' }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab component={Link} to='/my-courses/learning' label='My Learning' value='1' style={{ color: 'white' }} />
              <Tab component={Link} to='/my-courses/wishlist' label='Wishlist' value='2' style={{ color: 'white' }} />
            </TabList>
          </TabContext>
        </Box>
      </Grid >
      <Switch>
        <Route path='/my-courses/wishlist'>
          <Wishlist />
        </Route>
        <Route path='/my-courses/learning'>
          <MyLearning />
        </Route>
      </Switch>
    </Box>
  )
}

export default MyCourses
