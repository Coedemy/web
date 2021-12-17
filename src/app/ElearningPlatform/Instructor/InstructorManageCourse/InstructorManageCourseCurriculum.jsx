import React, { useRef } from 'react'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField, FormControl, MenuItem, InputLabel, Select } from '@mui/material'

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
      <Box sx={{ padding: '1rem' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          Curriculum
        </Typography>
      </Box>
      <Divider />
      {/* <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        innerRef={formRef}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>

            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Typography>
                Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.
              </Typography>
              <Typography>
                Welcome Message
              </Typography>
              <TextField />
              <Typography>
                Congratulations Message
              </Typography>
              <TextField />
            </Box>
          </form>
        )}
      </Formik> */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 4 }}>
        <Sections />
      </Box>
    </Box>
  )
}

export default InstructorManageCourseCurriculum  
