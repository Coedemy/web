import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Box, Icon, Button, FormControl, Select, MenuItem, List, ListItem, Avatar } from '@mui/material'

import { formatTime } from 'app/utils/time'
import { pauseVideo } from 'app/redux-toolkit/slices/courseSlice'

const searchModeItems = ['All Lectures', 'Current Lecture']
const sortModeItems = ['Sort By Recommended', 'Sort By Oldest']
const FilterModeItems = ['Filter questions', 'Filter answers']

const InstructorCommunication = () => {
  const [addNoteMode, setAddNoteMode] = useState(false)
  const [notesList, setNotesList] = useState([])
  const [curNote, setCurNote] = useState('')
  const [curSearchMode, setCurSearchMode] = useState(searchModeItems[0])
  const [curSortMode, setCurSortMode] = useState(sortModeItems[0])
  const [curFilterMode, setCurFilterMode] = useState(FilterModeItems[0])

  const dispatch = useDispatch()
  const courseReducer = useSelector(state => state.course)
  const canAvatar = useSelector(user => user.avatar)
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
    setNotesList(notes => [...notes, { _id: notes.length, value: curNote, time: currentTime, lectureTitle: courseReducer.currentLecture.title, lectureId: courseReducer.currentLecture.lectureId }])
    setAddNoteMode(false)
    setCurNote('')
  }


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2}}>
      <Box sx={{ width: '80%' }}>
        {
          addNoteMode ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <TextField size='small' placeholder='Add you question here' value={curNote} onChange={(e) => setCurNote(e.target.value)} />
              </Box>
              <Box sx={{ mt: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant='outlined' onClick={() => setAddNoteMode(false)}>Cancel</Button>
                <Button variant='contained' onClick={onAddNote}>Add question</Button>
              </Box>
            </Box>
          ) : <Box><Button variant='outlined' onClick={onStopAndAddNote}>+ Add a Question</Button></Box>
        }

        <Box sx={{ m: 2, ml: 0}}>
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
          <FormControl sx={{ m: 2, ml: 0, minWidth: 150 }}>
            <Select
              value={curFilterMode}
              onChange={(event) => setCurFilterMode(event.target.value)}
              displayEmpty
              size='small'
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {FilterModeItems.map((c, index) => <MenuItem sx={{ backgroundColor: 'white' }} value={FilterModeItems[index]} key={FilterModeItems[index]}>{FilterModeItems[index]}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <List>
          {
            notesList.map((note, index) => (
              <ListItem key={note._id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* <Chip label={formatTime(note.time)}></Chip> */}
                <Avatar
                  className='cursor-pointer'
                  src={canAvatar}
                />
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

export default InstructorCommunication
