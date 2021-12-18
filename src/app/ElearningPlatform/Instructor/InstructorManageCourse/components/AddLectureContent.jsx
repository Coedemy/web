import React, { useState } from 'react'
import { Button, Box, TextField, Typography } from '@mui/material'

const content = ['VIDEO', 'ARTICLE']

const AddLectureContent = () => {
  const [contentFile, setContentFile] = useState(null)


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
      <Typography>Select Video</Typography>
      <Box>
        <TextField type='file' size='small' onChange={(e) => setContentFile(e.target.files[0])} />
      </Box>
    </Box >
  )
}

export default AddLectureContent
