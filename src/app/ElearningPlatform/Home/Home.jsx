import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Box, FormControl, Select, MenuItem, TextField, Icon, Typography } from '@mui/material'

import CoursesList from './CoursesList'
import courseDataList from '../fakeData/coursesDataList'
import AppLayout from '../Layout/AppLayout'

const categories = [
  { id: 0, title: 'Business' },
  { id: 1, title: 'Development' },
  { id: 2, title: 'Music' },
  { id: 3, title: 'IT & Software' }]

const Home = () => {
  useEffect(() => {
    document.title = 'Coedemy'
  }, [])
  const [curCategory, setCurCategory] = useState('')

  const handleChange = (event) => {
    setCurCategory(event.target.value)
  }

  return (
    <AppLayout>
      <Helmet>
        <title>Coedemy</title>
        <meta name='Coedemy' content='Coedemy' />
      </Helmet>
      <Box sx={{ marginBottom: 4 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={curCategory}
              onChange={handleChange}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value=''>
                All
              </MenuItem>
              {categories.map(c => <MenuItem sx={{ backgroundColor: 'white' }} value={c.id} key={c.id}>{c.title}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={curCategory}
              onChange={handleChange}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value=''>
                All
              </MenuItem>
              {categories.map(c => <MenuItem sx={{ backgroundColor: 'white' }} value={c.id} key={c.id}>{c.title}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
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
      <CoursesList courses={courseDataList} />
      <Box sx={{ marginBottom: 4 }} />
    </AppLayout>
  )
}

export default Home
