import React, { useRef } from 'react'
import { Formik } from 'formik'
import { Box, Divider, Typography, Button, FormControl, Select, MenuItem } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

const InstructorManageCoursePricing = () => {

  const formRef = useRef()
  const initialValues = {
    currency: 'USD',
    price: 0
  }

  const handleSubmit = async (values, { isSubmitting }) => {
    console.log({ values })
  }

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          style={{ fontWeight: 600, fontFamily: 'SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol' }}
          variant='h5'
        >
          Pricing
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
                  <Select name='currency' defaultValue='USD' onChange={handleChange}>
                    <MenuItem value='VND'>VND</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size='small'>
                  <Select name='price' defaultValue={0} onChange={handleChange}>
                    <MenuItem value={0}>Free</MenuItem>
                    {
                      Array.from(Array(37).keys()).map(price => <MenuItem key={price} value={19 + 5 * price + 0.99}>{19 + 5 * price + 0.99}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box >
  )
}

export default InstructorManageCoursePricing  
