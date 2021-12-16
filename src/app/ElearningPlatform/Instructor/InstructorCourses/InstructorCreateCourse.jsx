import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import {
  Button, Dialog, DialogActions, DialogContent, FormControl, DialogTitle,
  Box, TextField, Typography, Select, MenuItem, useMediaQuery, InputLabel
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { getCategoriesList } from 'app/http/course'
import { MatxLoading } from 'app/components'

const InstructorCreateCourse = ({ label }) => {
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
      <Button variant='contained' onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth='lg'
        open={open}
        // onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          Create new course
        </DialogTitle>
        <DialogContent>
          {
            isLoading ? <MatxLoading /> : (
              <Box
                noValidate
                component='form'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
                }}
              >
                <Box sx={{ mb: 4 }} />
                <Typography variant='h5'>How about a working title?</Typography>
                <Typography>It's ok if you can't think of a good title now. You can change it later.</Typography>
                <Box sx={{ mb: 2 }} />
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                  <TextField name='title' className='w-full' id='outlined-basic' label='Title' size='small' variant='outlined' onChange={(e) => setTitle(e.target.value)} />
                </FormControl>

                <Box sx={{ mb: 6 }} />
                <Typography variant='h5'>What category best fits the knowledge you'll share?</Typography>
                <Typography>If you're not sure about the right category, you can change it later.</Typography>
                <Box sx={{ mb: 2 }} />
                <FormControl className='w-full' size='small'>
                  <InputLabel htmlFor='grouped-select'>Category</InputLabel>
                  <Select name='category' onChange={handleCategoryChange} defaultValue='0' id='grouped-select' label='Category'>
                    <MenuItem disabled value={0}>None</MenuItem>
                    {
                      data.courseCategoryList.map((c, index) => <MenuItem value={index + 1} key={c._id}>{c.title}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Box>
            )
          }

        </DialogContent>
        <DialogActions>
          <Button variant='outlined' autoFocus onClick={handleClose}>
            Exit
          </Button>
          <Button disabled={title === '' || category === 0} variant='contained' onClick={handleCreateCourse} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default InstructorCreateCourse