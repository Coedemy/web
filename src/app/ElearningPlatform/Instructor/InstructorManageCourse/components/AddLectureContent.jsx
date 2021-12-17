import React from 'react'
import { Button, Box } from '@mui/material'

const AddLectureContent = ({ close }) => {
  return (
    <>
      This is AddLectureContent
      <Box><Button size='small' variant='outlined' onClick={close}>Save</Button></Box>
    </>
  )
}

export default AddLectureContent
