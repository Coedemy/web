import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

const UnauthenticatedUserActions = () => {
  return (
    <Box>
      <Link to='/signin'><Button variant='outlined' sx={{ mr: 2, ml: 2 }}>Login</Button></Link>
      <Link to='/signup'><Button variant='contained'>Sign up</Button></Link>
    </Box>
  )
}

export default UnauthenticatedUserActions
