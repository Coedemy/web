import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import Lecture from './Lecture'

const Section = ({ section, sectionIndex, addLecture }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [lectureTitle, setLectureTitle] = useState('')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleDialogClose = () => {
    setLectureTitle('')
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  return (
    <Droppable droppableId={`droppable${section._id}`} type={`${sectionIndex}`}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          sx={{ p: '.5rem', width: '100%', }}
        >
          {section.lectures.map((lecture, index) => {
            return (
              <Draggable
                key={`${sectionIndex}${index}`}
                draggableId={`${section._id}_${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                      p: '.5rem',
                      m: '0 0 1rem 0',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}
                    {...provided.dragHandleProps}
                  >
                    <Lecture index={index} lecture={lecture} />
                  </Card>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
          <Button variant='outlined' onClick={handleDialogOpen}>+ Add Lecture</Button>
          <Dialog
            fullWidth={true}
            width='lg'
            open={dialogOpen}
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle id='responsive-dialog-title'>
              Create New Lecture
            </DialogTitle>
            <DialogContent>
              <TextField size='small' sx={{ width: '100%' }} value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button variant='outlined' autoFocus onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button variant='contained' autoFocus onClick={() => {
                addLecture({ sectionId: section._id, lectureTitle })
                handleDialogClose()
              }}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Droppable>
  )
}

export default Section
