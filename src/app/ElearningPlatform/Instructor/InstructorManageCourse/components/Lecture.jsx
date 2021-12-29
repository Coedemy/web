import React from 'react'

import { Box, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MenuIcon from '@mui/icons-material/Menu'

import EditLecture from './EditLecture'

const Lecture = ({ lecture, index }) => {

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <CheckCircleIcon fontSize='small' />Lecture {index + 1}: {lecture.title}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <EditLecture lecture={lecture} />
        <IconButton aria-label='add an alarm'>
          <DeleteOutlineIcon />
        </IconButton>
        <MenuIcon sx={{ cursor: 'move' }} />
      </Box>
    </>
  )
}

export default Lecture
