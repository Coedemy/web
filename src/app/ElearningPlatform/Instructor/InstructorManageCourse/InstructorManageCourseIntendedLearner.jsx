import React, { useRef } from 'react'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField } from '@mui/material'

const InstructorManageCourseIntendedLearner = () => {

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
          Intended learners
        </Typography>
      </Box>
      <Divider />
      <Formik
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
                The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
              </Typography>
              <Typography style={{ fontWeight: 600 }}>
                What will students learn in your course?
              </Typography>
              <Typography>
                You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.
              </Typography>
              <TextField size='small' placeholder='Example: Define the roles and responsibilities of a project manager' />
              <TextField size='small' placeholder='Example: Estimate project timelines and budgets' />
              <TextField size='small' placeholder='Example: Identify and manage project risks' />
              <TextField size='small' placeholder='Example: Complete a case study to manage a project from conception to completion' />


              <Typography style={{ fontWeight: 600 }}>
                What are the requirements or prerequisites for taking your course?
              </Typography>
              <Typography>
                List the required skills, experience, tools or equipment learners should have prior to taking your course.
                If there are no requirements, use this space as an opportunity to lower the barrier for beginners.
              </Typography>
              <TextField size='small' placeholder='Example: No programming experience needed. You will learn everything you need to know' />

              <Typography style={{ fontWeight: 600 }}>
                Who is this course for?
              </Typography>
              <Typography>
                Write a clear description of the intended learners for your course who will find your course content valuable.
                This will help you attract the right learners to your course.
              </Typography>
              <TextField size='small' placeholder='Example: Beginner Python developers curious about data science' />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default InstructorManageCourseIntendedLearner
