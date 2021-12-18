import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import {
  Button, Dialog, DialogActions, DialogContent, FormControl, DialogTitle, Divider,
  Box, TextField, Typography, Select, MenuItem, useMediaQuery, InputLabel, IconButton
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'

import { getCategoriesList } from 'app/http/course'
import { MatxLoading } from 'app/components'
import AddLectureContent from './AddLectureContent'
import AddLectureRecourses from './AddLectureResourses'

const EditLecture = ({ lecture }) => {
  const history = useHistory()

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(0)
  const { data, isLoading } = useQuery('categoriesList', getCategoriesList)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCategoryChange = (event) => {
    setCategory(
      event.target.value,
    )
  }

  const handleCreateCourse = () => {
    history.push(`/instructor/courses/41351421/manage/goals`)
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        maxWidth='md'
        fullWidth={true}
        open={open}
        // onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle>
          Lecture 1
        </DialogTitle>
        <DialogContent dividers>
          {
            isLoading ? <MatxLoading /> : (
              <Box
                noValidate
                component='form'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  height: '700px'
                }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography variant='h6'>Title</Typography>
                  <TextField name='title' className='w-full' size='small' variant='outlined' defaultValue={lecture} onChange={(e) => setTitle(e.target.value)} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant='h6'>Description</Typography>
                  <TextField name='title' className='w-full' size='small' variant='outlined' onChange={(e) => setTitle(e.target.value)} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant='h6'>Content</Typography>
                  <AddLectureContent />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant='h6'>Resources</Typography>
                  <AddLectureRecourses />
                </Box>
              </Box>
            )
          }

        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={title === '' || category === 0} variant='contained' onClick={handleCreateCourse}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default EditLecture