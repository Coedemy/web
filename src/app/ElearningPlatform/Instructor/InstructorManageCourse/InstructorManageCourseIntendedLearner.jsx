import React, { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Formik, Field, FieldArray } from 'formik'
import { Box, Divider, Typography, TextField, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import { updateCourseRequest } from 'app/http/course'
import { LoadingButton, FormikInput } from 'app/components'

const InstructorManageCourseIntendedLearner = ({ course }) => {

  const [canSave, setCanSave] = useState(false)
  const params = useParams()
  const { mutate, isLoading } = useMutation(updateCourseRequest, {
    mutationKey: 'updateIntendedLearner',
  })
  const formRef = useRef()

  const initialValues = {
    learningGoals: course.learningGoals ?? [],
    prerequisites: course.prerequisites ?? [],
    target: course.target ?? ''
  }

  const onUpdateSuccessfully = (data) => {
    setCanSave(false)
  }

  const handleSubmit = async (values, { isSubmitting }) => {
    values.learningGoals = values.learningGoals.filter(goal => goal !== '')

    mutate({ courseId: params.courseId, updatedCourse: values }, {
      onSuccess: onUpdateSuccessfully
    })
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
          Intended learners
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
                The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
              </Typography>
              <Typography style={{ fontWeight: 600 }}>
                What will students learn in your course?
              </Typography>
              <Typography>
                You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.
              </Typography>
              <FieldArray
                name='learningGoals'
                render={arrayHelpers => (
                  <Box>
                    {
                      values.learningGoals && values.learningGoals.length > 0 &&
                      values.learningGoals.map((goal, index) => (
                        <Box key={index} sx={{ width: '100%', mb: 2, display: 'flex', flexDirection: 'row' }}>
                          <Field component={FormikInput} size='small' sx={{ flex: 1 }} onChange={onChange(handleChange)} name={`learningGoals.${index}`} spellCheck={false} />
                          <IconButton color='error' onClick={onChange(() => arrayHelpers.remove(index))}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}

                    <Button size='small' variant='outlined' startIcon={<AddIcon />} onClick={() => arrayHelpers.push('')}>
                      Add
                    </Button>
                  </Box>
                )}
              />

              <Typography style={{ fontWeight: 600 }}>
                What are the requirements or prerequisites for taking your course?
              </Typography>
              <Typography>
                List the required skills, experience, tools or equipment learners should have prior to taking your course.
                If there are no requirements, use this space as an opportunity to lower the barrier for beginners.
              </Typography>

              <FieldArray
                name='prerequisites'
                render={arrayHelpers => (
                  <Box>
                    {
                      values.prerequisites && values.prerequisites.length > 0 &&
                      values.prerequisites.map((prerequisites, index) => (
                        <Box key={index} sx={{ width: '100%', mb: 2, display: 'flex', flexDirection: 'row' }}>
                          <Field component={FormikInput} size='small' sx={{ flex: 1 }} onChange={onChange(handleChange)} name={`prerequisites.${index}`} spellCheck={false} />
                          <IconButton color='error' onClick={onChange(() => arrayHelpers.remove(index))}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}

                    <Button size='small' variant='outlined' startIcon={<AddIcon />} onClick={() => arrayHelpers.push('')}>
                      Add
                    </Button>
                  </Box>
                )}
              />
              <Typography style={{ fontWeight: 600 }}>
                Who is this course for?
              </Typography>
              <Typography>
                Write a clear description of the intended learners for your course who will find your course content valuable.
                This will help you attract the right learners to your course.
              </Typography>
              <TextField size='small' name='target' onChange={onChange(handleChange)} defaultValue={values.target} spellCheck={false} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default InstructorManageCourseIntendedLearner
