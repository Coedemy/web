import React, { useRef } from 'react'
import { Formik } from 'formik'
import { Box, Divider, Typography, Button, FormControl, Select, MenuItem } from '@mui/material'

const InstructorManageCoursePricing = () => {

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
          Pricing
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
                Course Price Tier
              </Typography>
              <Typography>
                Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix.
              </Typography>
              <Typography>
                If you intend to offer your course for free, the total length of video content must be less than 2 hours.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <FormControl size='small'>
                  <Select defaultValue={1} onChange={handleChange}>
                    <MenuItem value={0}>VND</MenuItem>
                    <MenuItem value={1}>USD</MenuItem>
                    <MenuItem value={2}>EUR</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size='small'>
                  <Select autoWidth={true} defaultValue={0} onChange={handleChange}>
                    <MenuItem value={0}>Free</MenuItem>
                    {
                      Array.from(Array(37).keys()).map(price => <MenuItem value={19 + 5 * price}>{19 + 5 * price}.99</MenuItem>)
                    }
                  </Select>
                </FormControl>
                <Button variant='contained'>Save</Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box >
  )
}

export default InstructorManageCoursePricing  
