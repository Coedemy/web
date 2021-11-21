import React, { useState } from 'react'
import { TextField, Box, Icon, Button, FormControl, Select, MenuItem } from '@mui/material'

import CourseLearnTextEditor from './CourseLearnTextEditor'

const searchModeItems = ['All Lectures', 'Current Lecture']
const sortModeItems = ['Sort By Most Recent', 'Sort By Oldest']

const CourseLearnNotes = () => {
  const [content, setContent] = useState('')

  const [curSearchMode, setCurSearchMode] = useState(searchModeItems[0])
  const [curSortMode, setCurSortMode] = useState(sortModeItems[0])

  const handleChange = (event) => {
    setCurSearchMode(event.target.value)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80%' }}>
        <Box>
          <FormControl sx={{ m: 2, ml: 0, minWidth: 150 }}>
            <Select
              value={curSearchMode}
              onChange={handleChange}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {searchModeItems.map((c, index) => <MenuItem sx={{ backgroundColor: 'white' }} value={searchModeItems[index]} key={searchModeItems[index]}>{searchModeItems[index]}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, ml: 0, minWidth: 150 }}>
            <Select
              value={curSearchMode}
              onChange={handleChange}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {sortModeItems.map((c, index) => <MenuItem sx={{ backgroundColor: 'white' }} value={sortModeItems[index]} key={searchModeItems[index]}>{sortModeItems[index]}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            variant='outlined'
            placeholder='Search all course questions'
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
        <Box>
          <CourseLearnTextEditor
            content={content}
            handleContentChange={(content) => setContent(content)}
            placeholder='insert text here...'
          />
          <Button>Ask a new question</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseLearnNotes
