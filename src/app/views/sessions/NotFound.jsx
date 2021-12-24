import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Button, Typography, Box } from '@mui/material'

const NotFound = () => {
	return (
		<div className='flex justify-center items-center h-full-screen w-full'>
			<Helmet>
				<title>404 Not Found</title>
				<meta name='404 Not Found' content='404 Not Found' />
			</Helmet>
			<div className='flex-column justify-center items-center'>
				<Typography variant='h1'><Box sx={{ fontFamily: 'Courier New, monospace' }}>404</Box></Typography>
				<Typography variant='h5'><Box sx={{ fontFamily: 'Courier New, monospace' }}>We can’t find the page you’re looking for</Box></Typography>
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
		</div >
	)
}

export default NotFound
