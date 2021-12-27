import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Box, Icon, Button, FormControl, Select, MenuItem, List, ListItem, Chip } from '@mui/material'

import { formatTime } from 'app/utils/time'
import { pauseVideo, startVideo } from 'app/redux-toolkit/slices/courseSlice'

import CourseLearnTextEditor from './CourseLearnTextEditor'

const searchModeItems = ['All Lectures', 'Current Lecture']
const sortModeItems = ['Sort By Most Recent', 'Sort By Oldest']

const CourseLearnNotes = () => {
  const [addNoteMode, setAddNoteMode] = useState(false)
  const [notesList, setNotesList] = useState([])
  const [curNote, setCurNote] = useState('')
  const [curSearchMode, setCurSearchMode] = useState(searchModeItems[0])
  const [curSortMode, setCurSortMode] = useState(sortModeItems[0])

  const dispatch = useDispatch()
  const courseReducer = useSelector(state => state.course)
  const currentTime = courseReducer.currentLecture.currentTime

  useEffect(() => {
    setCurNote('')
  }, [courseReducer.currentLecture.lectureId])

  useEffect(() => {
    const pauseVideo = courseReducer.pauseVideo

    if (pauseVideo) {
      onStopAndAddNote()
    }
    else {
      setAddNoteMode(false)
    }
    setCurNote('')
  }, [courseReducer.pauseVideo])

  const canAddNote = () => {
    const notHasDuplicateNote = notesList.every(note => {
      return ((note.time !== currentTime) || (note.lectureId !== courseReducer.currentLecture.lectureId))
    })
    return notHasDuplicateNote && currentTime !== 0 && curNote !== ''
  }

  const onStopAndAddNote = () => {
    setAddNoteMode(true)
    dispatch(pauseVideo())
    setCurNote('')
  }

  const onAddNote = () => {
    setNotesList(notes => [{ _id: notes.length, value: curNote, time: currentTime, lectureTitle: courseReducer.currentLecture.title, lectureId: courseReducer.currentLecture.lectureId }, ...notes])
    setAddNoteMode(false)
    setCurNote('')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80%' }}>
        {
          addNoteMode ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <TextField size='small' placeholder='Add you note here' value={curNote} onChange={(e) => setCurNote(e.target.value)} />
              </Box>
              <Box sx={{ mt: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant='outlined' onClick={() => setAddNoteMode(false)}>Cancel</Button>
                <Button variant='contained' onClick={onAddNote} disabled={!canAddNote()}>Create Note at {formatTime(currentTime)}</Button>
              </Box>
            </Box>
          ) : <Box><Button variant='outlined' onClick={onStopAndAddNote}>+ Create a Note at {formatTime(currentTime)}</Button></Box>
        }

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
        {/* <Box>
          <CourseLearnTextEditor
            content={content}
            handleContentChange={(content) => setContent(content)}
            placeholder='insert text here...'
          />
          <Button>Ask a new question</Button>
        </Box> */}
        <List>
          {
            notesList.map((note, index) => (
              <ListItem key={note._id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                <Chip label={formatTime(note.time)}></Chip>
                <Box sx={{ ml: '2rem', p: '1rem', border: '1px solid black', width: '100%' }}>
                  <Box sx={{ fontWeight: 'bold' }}>{note.lectureTitle}</Box>
                  <Box>{note.value}</Box>

                </Box>
              </ListItem>
            ))
          }
        </List>
      </Box >
    </Box >
  )
}

export default CourseLearnNotes
