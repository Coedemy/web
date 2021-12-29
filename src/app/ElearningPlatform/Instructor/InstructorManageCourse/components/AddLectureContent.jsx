import React, { useState } from 'react'
import { Button, Box, TextField, Typography } from '@mui/material'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

const content = ['VIDEO', 'ARTICLE']

const AddLectureContent = ({ content, setContent }) => {

  const deleteFile = () => {
    setContent(null)
  }

  return (
    <>
      {
        content ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pb: 2, pt: 1 }}>
              <>
                <PlayCircleFilledIcon fontSize='small' />&nbsp;{content.content.name}
              </>
            </Box>
            <Button variant='outlined' color='error' onClick={deleteFile}>Delete</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
            <Typography>Select Video</Typography>
            <Box>
              <TextField type='file' inputProps={{ accept: 'video/mp4' }} size='small' onChange={(e) => setContent({ lectureContentType: 'VIDEO', content: e.target.files[0] })} />
            </Box>
          </Box>

        )
      }
    </>


  )
}

export default AddLectureContent
