import React, { useState, useRef } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { Box, Divider, Typography, Button, FormControl, Select, MenuItem } from '@mui/material'

import { LoadingButton } from 'app/components'
import { updateCourseRequest } from 'app/http/course'

const message = {
  title: 'Pricing',
  subtitle: 'Course Price Tier',
  description1: "Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix.",
  description2: 'If you intend to offer your course for free, the total length of video content must be less than 2 hours.',
}

const InstructorManageCoursePricing = ({ course }) => {

  const params = useParams()
  const [canSave, setCanSave] = useState(false)
  const formRef = useRef()
  const initialValues = {
    currency: 'USD',
    price: course.price || 0
  }

  const { mutate, isLoading } = useMutation(updateCourseRequest, {
    mutationKey: 'updateCoursePricing',
  })

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

  const renderPricingList = () => {
    const NUMBER_OF_GENERATED_PRICE = 37
    const MIN_PRICE = 19
    const STEP = 5
    const PROMOTION = 0.99

    const pricingList = Array.from(Array(NUMBER_OF_GENERATED_PRICE).keys())
    const calculatePrice = (price) => MIN_PRICE + STEP * price + PROMOTION

    return pricingList.map(price => <MenuItem key={price} value={calculatePrice(price)}>{calculatePrice(price)}</MenuItem>)
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
                {message.subtitle}
              </Typography>
              <Typography>
                {message.description1}
              </Typography>
              <Typography>
                {message.description2}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <FormControl size='small'>
                  <Select name='price' value={values.price} onChange={onChange(handleChange)}>
                    <MenuItem value={0}>Free</MenuItem>
                    {
                      renderPricingList()
                    }
                  </Select>
                </FormControl>
                <Box>VND</Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box >
  )
}

export default InstructorManageCoursePricing  
