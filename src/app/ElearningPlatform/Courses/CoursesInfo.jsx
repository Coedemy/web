import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import  AccessAlarmsIcon  from '@mui/icons-material/AccessAlarms'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import AirplayIcon from '@mui/icons-material/Airplay';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


const CourseInfo = () => {
    const location = useLocation()
    const { courseId, courseImage } = location.state
    const theme = useTheme()
    return (
        <Grid container spacing={0} style={{ border: '1px solid lightgray', marginLeft: 15 }}>
            <Grid item xs={12}>                          
                <Grid item>
                    <img style={{ width: '100%' }} src={courseImage} />
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='h4' sx={{fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 2}}>&nbsp;&nbsp;$9</Typography>
                    <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'line-through', marginLeft: 4 }}>$12</Typography>
                    <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>88% off</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'red', marginLeft: 3 }}><AccessAlarmsIcon style={{ opacity: 0.55, color: 'red' }} />2 days left at this price!</Box >
                <Grid container spacing={2} style={{ marginTop: 0, marginBottom: 5}}>
                    <Grid item xs={6}>
                        <Button variant="outlined"  style={{ fontWeight: 'bold', paddingLeft: 15, marginLeft: 30, width: 150}}>Add to cart</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined"  style={{ fontWeight: 'bold', paddingLeft: 15, marginLeft: 15, width: 120}} href="#contained-buttons">Like</Button>
                    </Grid>
                </Grid>
                <Button variant="contained"  style={{textAlign: 'center', fontWeight: 'bold', paddingLeft: 15, marginLeft: 30, width: 285, marginBottom: 5, display: 'block'}} href="#contained-buttons">Buy</Button>
                <Typography variant='h10' style={{ paddingLeft: 75, flexDirection: 'row', textAlign: 'center' }}>30-Day Money-Back Guarantee</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold', paddingLeft: 8, flexDirection: 'row', marginLeft: 30 }}>This course includes:</Typography>
                <Box sx={{ display: 'block', flexDirection: 'row' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><AirplayIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;55 hours on-demand video</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><ArticleIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;80 articles</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><DriveFileMoveIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;26 downloadable resources</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><AutoStoriesIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;8 coding exercises</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><AllInclusiveIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;Full lifetime access</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><AdUnitsIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;Access on mobile and TV</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}><EmojiEventsIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;Certificate of completion</Box>
                </Box>
                <Grid container spacing={2} style={{ marginTop: 0, marginBottom: 5}}>
                    <Grid item xs={5}>
                        <Button style={{ fontWeight: 'bold', paddingLeft: 15, marginLeft: 10, width: 150, textDecoration: 'underline'}}>Apply Coupon</Button>
                    </Grid>
                    <Grid item xs={7}>
                        <Button style={{ fontWeight: 'bold', marginLeft: 15, width: 150, textDecoration: 'underline'}} href="#contained-buttons">Gift this course</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default CourseInfo