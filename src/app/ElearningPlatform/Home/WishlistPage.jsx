import React from 'react'
import { Box, Grid, Typography, TextField, Icon } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AppLayout from '../Layout/AppLayout'


import courseDataList from '../fakeData/coursesDataList'
import CoursesList from './CoursesList';


const WishlistPage = () => {
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box>
			<Grid style={{ backgroundColor: '#212944', color: 'white', height: 150, marginTop: 5, paddingTop: 30 }}>
				<Typography variant='h3' style={{ fontWeight: 'bold', textAlign: 'center', flexDirection: 'row', marginLeft: 30 }}>My Learning</Typography>
				<Box sx={{ width: '100%', typography: 'body1', color: 'white' }}>
					<TabContext value={value}>
						<Box sx={{ marginLeft: 70}}>
							<TabList onChange={handleChange} aria-label="lab API tabs example">
								<Tab label="All courses" value="1" style={{ color: 'white', textColor:'secondary'}}/>
								<Tab label="My List" value="2" style={{ color: 'white', textColor: 'secondary'}}/>
								<Tab label="Wishlist" value="3" style={{ color: 'white'}}/>
								<Tab label="Archived" value="4" style={{ color: 'white'}}/>
							</TabList>
						</Box>
					</TabContext>
				</Box>
			</Grid >
		<AppLayout>		
			<Box sx={{ marginBottom: 4}} />
				<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginLeft: 100 }}>					
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
			<CoursesList courses={courseDataList} />
		</AppLayout>
		</Box>
	)
}

export default WishlistPage
