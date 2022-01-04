import React from 'react'

import { Box, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MenuIcon from '@mui/icons-material/Menu'

import { ConfirmDeleteDialog } from 'app/components'

import EditLecture from './EditLecture'

const Lecture = ({ lecture, section, removeLecture, index }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <CheckCircleIcon fontSize='small' />Lecture {index + 1}: {lecture.title}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <EditLecture lecture={lecture} />
        <ConfirmDeleteDialog
          title='Remove Lecture'
          content='Do you want to remove this lecture?'
          onSubmit={(e) => removeLecture(e, { lectureId: lecture._id, sectionId: section._id })}
        />
        <MenuIcon sx={{ cursor: 'move' }} />
      </Box>
    </>
  )
}

export default Lecture
