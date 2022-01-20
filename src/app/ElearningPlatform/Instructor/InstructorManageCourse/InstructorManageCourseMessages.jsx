import React, { useState, useRef } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField, Button } from '@mui/material'

import { LoadingButton } from 'app/components'
import { updateCourseRequest } from 'app/http/course'

const message = {
  title: 'Course Messages',
  description: 'Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.',
  welcomeSubtitle: 'Welcome Message',
  congratulationsSubtitle: 'Congratulations Message'
}

const InstructorManageCourseLandingPage = ({ course }) => {

  const params = useParams()
  const [canSave, setCanSave] = useState(false)
  const formRef = useRef()

  const { mutate, isLoading } = useMutation(updateCourseRequest, {
    mutationKey: 'updateCourseMessage',
  })
  const initialValues = {
    welcomeMessage: course.welcomeMessage,
    congratulationsMessage: course.congratulationsMessage
  }

  const handleSubmit = async (values, { isSubmitting }) => {
    mutate({ courseId: params.courseId, updatedCourse: values }, {
      onSuccess: onUpdateSuccessfully
    })
  }

  const onUpdateSuccessfully = (data) => {
    setCanSave(false)
  }

  const onChange = (handleChange) => {
    return (e) => {
      handleChange(e)
      setCanSave(true)
    }
  }

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          {message.title}
        </Typography>
        <LoadingButton disabled={!canSave} loading={isLoading} label={isLoading ? 'Saving' : canSave ? 'Save' : 'Saved'} onClick={() => formRef.current.handleSubmit()} />
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
                {message.description}
              </Typography>
              <Typography>
                {message.welcomeSubtitle}
              </Typography>
              <TextField size='small' name='welcomeMessage' onChange={onChange(handleChange)} defaultValue={values.welcomeMessage} multiline rows={6} />
              <Typography>
                {message.congratulationsSubtitle}
              </Typography>
              <TextField size='small' name='congratulationsMessage' onChange={onChange(handleChange)} defaultValue={values.congratulationsMessage} multiline rows={6} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default InstructorManageCourseLandingPage  
