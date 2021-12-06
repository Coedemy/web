import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Button, Typography, Box } from '@mui/material'

const InternalServer = () => {
  return (
    <div className='flex justify-center items-center h-full-screen w-full'>
      <Helmet>
        <title>500 Internal Server Error</title>
        <meta name='500 Internal Server Error' content='500 Internal Server Error' />
      </Helmet>
      <div className='flex-column justify-center items-center'>
        {/* <img
          className='mb-8 w-full'
          src='/assets/images/illustrations/404.svg'
          alt=''
        /> */}

        <Typography variant='h1'><Box sx={{ fontFamily: 'Courier New, monospace' }}>500</Box></Typography>
        <Typography variant='h5'><Box sx={{ fontFamily: 'Courier New, monospace' }}>Opps! Somethings went wrong...</Box></Typography>
        <Box sx={{ mb: 4 }} />
        <Link to='/'>
          <Button
            className='capitalize'
            variant='contained'
            color='primary'
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default InternalServer
