import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField, FormControl, MenuItem, Select, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

import { languages } from 'app/utils/languages'
import { getCategoriesList, updateCourseRequest } from 'app/http/course'
import { MatxLoading } from 'app/components'
import useUploadImage from 'app/hooks/useUploadImage'

const courseImagePlaceholder = 'https://s.udemycdn.com/course/750x422/placeholder.jpg'

const levels = [
  { id: 1, title: 'Beginner Level' },
  { id: 2, title: 'Intermediate Level' },
  { id: 3, title: 'Expert Level' },
  { id: 4, title: 'All Levels' }
]

const InstructorManageCourseLandingPage = () => {
  const params = useParams()
  const [promotionVideo, setPromotionVideo] = useState()
  const { imageUrl: courseImageUrl, imageFile: courseImageFile, handleUploadImage } = useUploadImage({ defaultUrl: courseImagePlaceholder })
  const { mutate } = useMutation(updateCourseRequest, {
    mutationKey: 'updateCourseLanding',
  })

  const { data, isLoading } = useQuery('categoriesList', getCategoriesList)
  const formRef = useRef()
  const initialValues = {
    title: '',
    subtitle: '',
    description: '',
    language: '',
    level: '',
    category: '',
    representativeTopic: ''
  }

  const onUpdateSuccessfully = (data) => {
    console.log({ data })
  }

  const handleSubmit = async (values) => {
    console.log({ values, courseImageFile, promotionVideo })
    const formData = new FormData()
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value)
      console.log(value)
    }
    formData.append('courseImage', courseImageFile)
    formData.append('promotionVideo', promotionVideo)
    mutate({ courseId: params.courseId, updatedCourse: formData, isFormData: true }, {
      onSuccess: onUpdateSuccessfully
    })
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
        <Button variant='contained' startIcon={<SaveIcon />} onClick={() => formRef.current.handleSubmit()}>
          Save
        </Button>
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
                  <TextField name='title' size='small' placeholder='Insert your course title' onChange={handleChange} />
                  <Typography>
                    Course subtitle
                  </Typography>
                  <TextField name='subtitle' size='small' placeholder='Insert your course subtitle' onChange={handleChange} />
                  <Typography>
                    Course description
                  </Typography>
                  <TextField name='description' type='area' size='small' placeholder='Insert your course description' onChange={handleChange} />
                  <Typography>
                    Basic Info
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <FormControl className='w-full' size='small'>
                      <Select name='language' defaultValue={languages[42][1]} onChange={handleChange}>
                        {
                          languages.map(lang => <MenuItem key={lang[0]} value={lang[1]}>{lang[0]} ({lang[1]})</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select name='level' defaultValue={0} onChange={handleChange}>
                        <MenuItem disabled value={0}>-- Select Level --</MenuItem>
                        {
                          levels.map(level => <MenuItem key={level.id} value={level.title}>{level.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select name='category' defaultValue={0} onChange={handleChange}>
                        <MenuItem disabled value={0}>-- Select Category --</MenuItem>
                        {
                          data.courseCategoryList.map(category => <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography>
                    What is primarily taught in your course?
                  </Typography>
                  <TextField name='representativeTopic' size='small' placeholder='e.g. Landscape Photography' onChange={handleChange} />

                  <Typography>
                    Course Image
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <img src={courseImageUrl} width='400' height='250' />
                    <TextField type='file' size='small' onChange={handleUploadImage} inputProps={{ accept: 'image/png, image/gif, image/jpeg' }} />
                  </Box>

                  <Typography>
                    Promotional Video
                  </Typography>
                  <TextField type='file' size='small' onChange={(e) => setPromotionVideo(e.target.files[0])} inputProps={{ accept: 'video/mp4' }} />
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
