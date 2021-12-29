import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import { Box, FormControl, Select, MenuItem, TextField, Icon } from '@mui/material'

import { getCategoriesListRequest } from 'app/http/course'

import CoursesList from './CoursesList'
import SearchBar from './SearchBar'
import AppLayout from '../Layout/AppLayout'

const Home = () => {
  const [filterCategory, setFilterCategory] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const { data, isLoading } = useQuery('categoriesList', getCategoriesListRequest)

  const handleChange = (event) => {
    setSearchKeyword('')
    setFilterCategory(event.target.value)
  }

  const search = (keyword) => {
    setSearchKeyword(keyword)
    setFilterCategory('')
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
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <Select
              value={filterCategory}
              onChange={handleChange}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value=''>
                All
              </MenuItem>
              {data?.courseCategoryList.map(c => <MenuItem sx={{ backgroundColor: 'white' }} value={c._id} key={c._id}>{c.title}</MenuItem>)}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          </FormControl> */}
        </Box>

        <SearchBar search={search} />

        {/* <Box>
          <TextField
            variant='outlined'
            placeholder='Find a product'
            size='small'
            fullWidth
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            InputProps={{
              startAdornment: (
                <Icon className='mr-3' fontSize='small'>
                  search
                </Icon>
              ),
            }}
          />
        </Box> */}
      </Box>
      <Box sx={{ marginBottom: 4 }} />
      <CoursesList filterCategoryId={filterCategory} searchKeyword={searchKeyword} />
      < Box sx={{ marginBottom: 4 }} />
    </AppLayout>
  )
}

export default Home
