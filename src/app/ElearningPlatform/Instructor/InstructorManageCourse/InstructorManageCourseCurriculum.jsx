import React, { useRef } from 'react'
import { Formik } from 'formik'
import { Box, Divider, Typography, Button } from '@mui/material'

import Sections from './components/Sections'

const InstructorManageCourseCurriculum = () => {

  const formRef = useRef()
  const initialValues = {

  }

  const handleSubmit = async (values, { isSubmitting }) => {
    console.log({ values })
  }

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          Curriculum
        </Typography>
        <Button variant='contained'>Save</Button>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 4 }}>
        <Sections />
      </Box>
    </Box>
  )
}

export default InstructorManageCourseCurriculum  
