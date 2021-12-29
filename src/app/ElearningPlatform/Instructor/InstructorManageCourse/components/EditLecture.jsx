import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import {
  Button, Dialog, DialogActions, DialogContent, FormControl, DialogTitle, Divider,
  Box, TextField, Typography, Select, Checkbox, useMediaQuery, IconButton
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'

import { getCategoriesListRequest, updateLecureContentRequest } from 'app/http/course'
import { MatxLoading, LoadingButton } from 'app/components'
import AddLectureContent from './AddLectureContent'
import AddLectureResourses from './AddLectureResourses'

const EditLecture = ({ lecture }) => {
  console.log({ lecture })
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(lecture.title || '')
  const [canPreview, setCanPreview] = useState(lecture.canPreview || false)
  // const [content, setContent] = useState()
  const [content, setContent] = useState(lecture.content ? (
    lecture.content.lectureContentType === 'VIDEO' ? { lectureContentType: 'VIDEO', content: { name: lecture.content.video.title } } : null
  ) : null)
  const [resource, setResource] = useState(lecture.resource ? (
    lecture.resource.lectureResourceType === 'DOWNLOADABLE_FILE' ? { lectureResourceType: 'DOWNLOADABLE_FILE', content: { name: lecture.resource.title, url: lecture.resource.resourceUrl } } : null
  ) : null)
  const [category, setCategory] = useState(0)
  const { data, isLoading } = useQuery('categoriesList', getCategoriesListRequest)
  const { mutate, isLoading: isUpdating } = useMutation(updateLecureContentRequest)
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
    const formData = new FormData()

    formData.append('title', title)
    formData.append('canPreview', canPreview)
    formData.append('resourceType', resource?.lectureResourceType)
    if (resource?.lectureResourceType === 'EXTERNAL_RESOURCE') formData.append('resourceContent', content?.content)
    formData.append('contentType', content?.lectureContentType)

    formData.append('contentFile', content?.content)
    formData.append('resourceFile', resource?.content)
    mutate({ lectureId: lecture._id, lectureContent: formData, isFormData: true }, { onSuccess: handleClose })
  }

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        maxWidth='md'
        fullWidth={true}
        open={open}
      >
        <DialogTitle>
          {lecture.title}
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
                  <TextField name='title' className='w-full' size='small' variant='outlined' defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                </Box>

                <Box sx={{ mb: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                  <Typography variant='h6'>Can Preview</Typography>
                  <Checkbox checked={canPreview} onChange={e => setCanPreview(e.target.checked)} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant='h6'>Content</Typography>
                  <AddLectureContent content={content} setContent={setContent} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant='h6'>Resources</Typography>
                  <AddLectureResourses resource={resource} setResource={setResource} />
                </Box>
              </Box>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button sx={{ mr: '1rem' }} variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton loading={isUpdating} label='Save' onClick={handleCreateCourse} />
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EditLecture