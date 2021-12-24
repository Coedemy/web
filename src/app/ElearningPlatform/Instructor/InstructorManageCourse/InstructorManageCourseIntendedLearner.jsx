import React, { useRef } from 'react'
import { useMutation } from 'react-query'
import { Formik, Field, FieldArray } from 'formik'
import { Box, Divider, Typography, TextField, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

import { updateCourseRequest } from 'app/http/course'

const placeholders = [
  'Example: Define the roles and responsibilities of a project manager',
  'Example: Estimate project timelines and budgets',
  'Example: Identify and manage project risks',
  'Example: Identify and manage project risks'
]

const InstructorManageCourseIntendedLearner = () => {

  const { mutate, isLoading } = useMutation(updateCourseRequest, {
    mutationKey: 'updateIntendedLearner',
  })
  const formRef = useRef()

  const initialValues = {
    learningGoals: ['', '', '', ''],
    prerequisites: ['', '', '', ''],
    target: ''
  }

  const handleSubmit = async (values, { isSubmitting }) => {
    console.log('save')
    const result = { ...values, learningGoals: values.learningGoals.filter(goal => goal !== '') }
    console.log({ result })
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
        <Button variant='contained' startIcon={<SaveIcon />} onClick={() => formRef.current.handleSubmit()}>
          Save
        </Button>
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
                          <TextField size='small' sx={{ flex: 1 }} onChange={handleChange} name={`learningGoals.${index}`} placeholder={placeholders[index]} spellCheck={false} />
                          <IconButton color='error' onClick={() => arrayHelpers.remove(index)}>
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
                      values.prerequisites.map((goal, index) => (
                        <Box key={index} sx={{ width: '100%', mb: 2, display: 'flex', flexDirection: 'row' }}>
                          <TextField size='small' sx={{ flex: 1 }} onChange={handleChange} name={`prerequisites.${index}`} placeholder={placeholders[index]} spellCheck={false} />
                          <IconButton color='error' onClick={() => arrayHelpers.remove(index)}>
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
              <TextField size='small' name='target' onChange={handleChange} placeholder='Example: Beginner Python developers curious about data science' spellCheck={false} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default InstructorManageCourseIntendedLearner
