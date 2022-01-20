import React from 'react'
import { TextField } from '@mui/material'

const FormikInput = ({ field, form, ...props }) => {
  return <TextField {...field} {...props} />
}

export default FormikInput