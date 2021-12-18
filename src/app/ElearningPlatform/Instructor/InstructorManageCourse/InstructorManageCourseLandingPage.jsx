import React, { useRef } from 'react'
import { useQuery } from 'react-query'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField, FormControl, MenuItem, InputLabel, Select, OutlinedInput, Button } from '@mui/material'

import { languages } from 'app/utils/languages'
import { getCategoriesList } from 'app/http/course'
import { MatxLoading } from 'app/components'

const courseImagePlaceholder = 'https://s.udemycdn.com/course/750x422/placeholder.jpg'

const levels = [
  { id: 1, title: 'Beginner Level' },
  { id: 2, title: 'Intermediate Level' },
  { id: 3, title: 'Expert Level' },
  { id: 4, title: 'All Levels' }
]

const InstructorManageCourseLandingPage = () => {

  const { data, isLoading } = useQuery('categoriesList', getCategoriesList)
  const formRef = useRef()
  const initialValues = {

  }
  const handleSubmit = async (values, { isSubmitting }) => {
    console.log({ values })
  }

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          Course landing page
        </Typography>
        <Button variant='contained'>Save</Button>
      </Box>
      <Divider />
      {
        isLoading ? <MatxLoading /> : (
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
                    Course title
                  </Typography>
                  <TextField size='small' placeholder='Insert your course title' />
                  <Typography>
                    Course subtitle
                  </Typography>
                  <TextField size='small' placeholder='Insert your course subtitle' />
                  <Typography>
                    Course description
                  </Typography>
                  <TextField type='area' size='small' placeholder='Insert your course description' />
                  <Typography>
                    Basic Info
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <FormControl className='w-full' size='small'>
                      <Select defaultValue={languages[42][1]} onChange={handleChange}>
                        {
                          languages.map(lang => <MenuItem key={lang[0]} value={lang[1]}>{lang[0]} ({lang[1]})</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select defaultValue={0} onChange={handleChange}>
                        <MenuItem value={0}>-- Select Level --</MenuItem>
                        {
                          levels.map(level => <MenuItem key={level.id} value={level.id}>{level.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select defaultValue={0} onChange={handleChange}>
                        <MenuItem value={0}>-- Select Category --</MenuItem>
                        {
                          data.courseCategoryList.map(category => <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography>
                    What is primarily taught in your course?
                  </Typography>
                  <TextField type='area' size='small' placeholder="e.g. Go: The Complete Developer's Guide (Golang)" />

                  <Typography>
                    Course Image
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <img src={courseImagePlaceholder} width='400' height='250' />
                    <TextField type='file' size='small' placeholder='Insert your course subtitle' />
                  </Box>

                  <Typography>
                    Promotional Video
                  </Typography>
                  <Box>
                    <TextField type='file' size='small' placeholder='Insert your course subtitle' />
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        )
      }
    </Box >
  )
}

export default InstructorManageCourseLandingPage  
