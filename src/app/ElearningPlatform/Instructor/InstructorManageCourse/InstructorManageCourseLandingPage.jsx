import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { Box, Divider, Typography, TextField, FormControl, MenuItem, Select, Button } from '@mui/material'

import { languages } from 'app/utils/languages'
import { getCategoriesListRequest, updateCourseRequest } from 'app/http/course'
import { MatxLoading, LoadingButton } from 'app/components'
import useUploadImage from 'app/hooks/useUploadImage'

const message = {
  title: 'Course Landing Page',
  titleSubtitle: 'Course title',
  subtitleSubtitle: 'Course subtitle',
  descriptionSubtitle: 'Course description',
  basicInfoSubtitle: 'Basic Info',
  representativeTopicSubtitle: 'What is primarily taught in your course?',
  courseImageSubtitle: 'Course Image',
  promotionVideoSubtitle: 'Promotional Video',
  titlePlaceholder: 'Insert your course title',
  subtitlePlaceholder: 'Insert your course subtitle',
  descriptionPlaceholder: 'Insert your course description',
  representativeTopicPlaceholder: 'e.g. Landscape Photography'
}

const levels = [
  { id: 0, title: 'Beginner Level' },
  { id: 1, title: 'Intermediate Level' },
  { id: 2, title: 'Expert Level' },
  { id: 3, title: 'All Levels' }
]

const InstructorManageCourseLandingPage = ({ course }) => {
  const params = useParams()
  const [canSave, setCanSave] = useState(false)
  const [promotionVideo, setPromotionVideo] = useState()
  const { imageUrl: courseImageUrl, imageFile: courseImageFile, handleUploadImage } = useUploadImage({ defaultUrl: course.courseImage })
  const { mutate, isUpdating } = useMutation(updateCourseRequest, {
    mutationKey: 'updateCourseLanding',
  })

  const { data, isLoading } = useQuery('categoriesList', getCategoriesListRequest)
  const formRef = useRef()
  const initialValues = {
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    language: course.language,
    level: course.level,
    category: course.category._id,
    representativeTopic: course.representativeTopic
  }

  const onUpdateSuccessfully = (data) => {
    setCanSave(false)
  }

  const handleSubmit = async (values) => {
    const formData = new FormData()
    console.log(values)
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value)
    }
    if (courseImageFile) formData.append('courseImage', courseImageFile)
    if (promotionVideo) formData.append('promotionVideo', promotionVideo)
    mutate({ courseId: params.courseId, updatedCourse: formData, isFormData: true }, {
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
      <Box sx={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          {message.title}
        </Typography>
        <LoadingButton disabled={!canSave} loading={isUpdating} label={isUpdating ? 'Saving' : canSave ? 'Save' : 'Saved'} onClick={() => formRef.current.handleSubmit()} />
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
                    {message.titleSubtitle}
                  </Typography>
                  <TextField name='title' size='small' placeholder={message.titlePlaceholder} value={values.title} onChange={onChange(handleChange)} />
                  <Typography>
                    {message.subtitleSubtitle}
                  </Typography>
                  <TextField name='subtitle' size='small' placeholder={message.subtitlePlaceholder} value={values.subtitle} onChange={onChange(handleChange)} />
                  <Typography>
                    {message.descriptionSubtitle}
                  </Typography>
                  <TextField name='description' type='area' size='small' placeholder={message.descriptionPlaceholder} value={values.description} onChange={onChange(handleChange)} />
                  <Typography>
                    {message.basicInfoSubtitle}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <FormControl className='w-full' size='small'>
                      <Select name='language' value={values.language} onChange={onChange(handleChange)}>
                        {
                          languages.map((lang, index) => <MenuItem key={index} value={lang[1]}>{lang[0]} ({lang[1]})</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select name='level' value={levels[values.level].id} onChange={onChange(handleChange)}>
                        <MenuItem disabled value={0}>-- Select Level --</MenuItem>
                        {
                          levels.map(level => <MenuItem key={level.id} value={level.id}>{level.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    <FormControl className='w-full' size='small'>
                      <Select name='category' value={values.category} onChange={onChange(handleChange)}>
                        <MenuItem disabled value={0}>-- Select Category --</MenuItem>
                        {
                          data.courseCategoryList.map(category => <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography>
                    {message.representativeTopicSubtitle}
                  </Typography>
                  <TextField name='representativeTopic' value={values.representativeTopic} size='small' placeholder={message.representativeTopicPlaceholder} onChange={onChange(handleChange)} />

                  <Typography>
                    {message.courseImageSubtitle}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <img src={courseImageUrl} width='400' height='250' />
                    <TextField type='file' size='small' onChange={onChange(handleUploadImage)} inputProps={{ accept: 'image/png, image/gif, image/jpeg' }} />
                  </Box>

                  <Typography>
                    {message.promotionVideoSubtitle}
                  </Typography>
                  <TextField type='file' size='small' onChange={onChange((e) => setPromotionVideo(e.target.files[0]))} inputProps={{ accept: 'video/mp4' }} />
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
