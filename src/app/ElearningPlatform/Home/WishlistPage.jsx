import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Box, Grid, Typography, TextField, Icon } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import CourseItem from './CourseItem'
import AppLayout from '../Layout/AppLayout'
import courseDataList from '../fakeData/coursesDataList'


const WishlistPage = () => {
	const [value, setValue] = useState('1')
	const { wishlist } = useSelector((state) => state.user)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<Box>
			<Helmet>
				<title>Wishlist</title>
				<meta name='Wishlist' content='Wishlist' />
			</Helmet>
			<Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, marginTop: 5, paddingTop: 30 }}>
				<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>My Learning</Typography>
				<Box sx={{ width: '100%', typography: 'body1', color: 'white', display: 'flex', justifyContent: 'center' }}>
					<TabContext value={value}>
						<TabList onChange={handleChange} aria-label='lab API tabs example'>
							<Tab label='All courses' value='1' style={{ color: 'white', textColor: 'secondary' }} />
							<Tab label='My List' value='2' style={{ color: 'white', textColor: 'secondary' }} />
							<Tab label='Wishlist' value='3' style={{ color: 'white' }} />
							<Tab label='Archived' value='4' style={{ color: 'white' }} />
						</TabList>
					</TabContext>
				</Box>
			</Grid >
			<AppLayout>
				<Box sx={{ marginBottom: 4 }} />
				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
					<Box>
						<TextField
							variant='outlined'
							placeholder='Find a product'
							size='small'
							fullWidth
							InputProps={{
								startAdornment: (
									<Icon className='mr-3' fontSize='small'>
										search
									</Icon>
								),
							}}
						/>
					</Box>
				</Box>
				<Box sx={{ marginBottom: 4 }} />
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={3}>
						{
							wishlist.map((course, index) => ((
								<Grid item xs={4} key={course._id}>
									<CourseItem course={course} index={index} />
								</Grid>
							)))
						}
					</Grid>
				</Box >
				<Box sx={{ marginBottom: 4 }} />
			</AppLayout>
		</Box>
	)
}

export default WishlistPage
