import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Box, Icon, Button, FormControl, Select, MenuItem } from '@mui/material'

import { formatTime } from 'app/utils/time'

import CourseLearnTextEditor from './CourseLearnTextEditor'

const searchModeItems = ['All Lectures', 'Current Lecture']
const sortModeItems = ['Sort By Most Recent', 'Sort By Oldest']

const CourseLearnNotes = () => {
  const [content, setContent] = useState('')
  const [curSearchMode, setCurSearchMode] = useState(searchModeItems[0])
  const [curSortMode, setCurSortMode] = useState(sortModeItems[0])

  const lectureReducer = useSelector(state => state.course)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80%' }}>
        <Box>
          <Button variant='outlined'>Create a Note at {formatTime(lectureReducer.currentLecture.currentTime)}</Button>
        </Box>
        <Box>
          <FormControl sx={{ m: 2, ml: 0, minWidth: 150 }}>
            <Select
              value={curSearchMode}
              onChange={(event) => setCurSearchMode(event.target.value)}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {searchModeItems.map((c, index) => <MenuItem sx={{ backgroundColor: 'white' }} value={searchModeItems[index]} key={searchModeItems[index]}>{searchModeItems[index]}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, ml: 0, minWidth: 150 }}>
            <Select
              value={curSortMode}
              onChange={(event) => setCurSortMode(event.target.value)}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {sortModeItems.map((c, index) => <MenuItem sx={{ backgroundColor: 'white' }} value={sortModeItems[index]} key={sortModeItems[index]}>{sortModeItems[index]}</MenuItem>)}
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
