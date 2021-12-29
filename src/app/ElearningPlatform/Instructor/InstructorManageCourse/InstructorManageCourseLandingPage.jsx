import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField, FormControl, MenuItem, Select, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

import { languages } from 'app/utils/languages'
import { getCategoriesListRequest, updateCourseRequest } from 'app/http/course'
import { MatxLoading } from 'app/components'
import useUploadImage from 'app/hooks/useUploadImage'

const levels = [
  { id: 1, title: 'Beginner Level' },
  { id: 2, title: 'Intermediate Level' },
  { id: 3, title: 'Expert Level' },
  { id: 4, title: 'All Levels' }
]

const InstructorManageCourseLandingPage = ({ course }) => {
  const params = useParams()
  const [promotionVideo, setPromotionVideo] = useState()
  const { imageUrl: courseImageUrl, imageFile: courseImageFile, handleUploadImage } = useUploadImage({ defaultUrl: course.courseImage })
  const { mutate } = useMutation(updateCourseRequest, {
    mutationKey: 'updateCourseLanding',
  })

  const { data, isLoading } = useQuery('categoriesList', getCategoriesListRequest)
  const formRef = useRef()
  const initialValues = {
    title: course.title ?? '',
    subtitle: course.title ?? '',
    description: course.title ?? '',
    language: languages[42][0],
    level: '',
    category: course.category ? course.category._id : '',
    representativeTopic: course.representativeTopic ?? ''
  }

  const onUpdateSuccessfully = (data) => {
    console.log({ data })
  }

  const handleSubmit = async (values) => {
    const formData = new FormData()
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value)
    }
    if (courseImageFile) formData.append('courseImage', courseImageFile)
    if (promotionVideo) formData.append('promotionVideo', promotionVideo)
    mutate({ courseId: params.courseId, updatedCourse: formData, isFormData: true }, {
      onSuccess: onUpdateSuccessfully
    })
  }

  console.log(course.language)

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
                  <TextField name='title' size='small' placeholder='Insert your course title' value={values.title} onChange={handleChange} />
                  <Typography>
                    Course subtitle
                  </Typography>
                  <TextField name='subtitle' size='small' placeholder='Insert your course subtitle' value={values.subtitle} onChange={handleChange} />
                  <Typography>
                    Course description
                  </Typography>
                  <TextField name='description' type='area' size='small' placeholder='Insert your course description' value={values.description} onChange={handleChange} />
                  <Typography>
                    Basic Info
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <FormControl className='w-full' size='small'>
                      <Select name='language' value={languages[42][0]} onChange={handleChange}>
                        {
                          languages.map(lang => <MenuItem key={lang[0]} value={lang[0]}>{lang[0]} ({lang[1]})</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select name='level' value={levels[0].title} onChange={handleChange}>
                        <MenuItem disabled value={0}>-- Select Level --</MenuItem>
                        {
                          levels.map(level => <MenuItem key={level.id} value={level.title}>{level.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select name='category' value={data.courseCategoryList[0]._id} onChange={handleChange}>
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
                  <TextField name='representativeTopic' value={values.representativeTopic} size='small' placeholder='e.g. Landscape Photography' onChange={handleChange} />

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
