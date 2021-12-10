import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import  AccessAlarmsIcon  from '@mui/icons-material/AccessAlarms'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import AirplayIcon from '@mui/icons-material/Airplay';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { grid } from '@mui/system';


const CourseInfo = ({course}) => {
    return (
        <Box container spacing={0} style={{ border: '1px solid lightgray'}}>
            <Box item xs={12}>                          
                <Box item>
                    <img style={{ width: '100%' }} src={course.courseImage} />
                </Box>
                <Grid item sx={{p : 2}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant='h4' sx={{fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>$9</Typography>
                        <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'line-through', marginLeft: '10px'}}>$12</Typography>
                        <Typography variant='h6' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px'}}>88% off</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'red'}}><AccessAlarmsIcon style={{ opacity: 0.55, color: 'red' }} />2 days left at this price!</Box >
                    <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1, mt: 1}}>
                        <Button variant="outlined"  sx={{ fontWeight: 'bold', width: '100%', mr: 1}}>Add to cart</Button>
                        <Button variant="outlined"  sx={{ fontWeight: 'bold'}}>Like</Button>
                    </Box>
                    <Button variant="contained"  style={{textAlign: 'center', fontWeight: 'bold', width: '100%', marginBottom: 5, display: 'block'}}>Buy</Button>
                    <Typography variant='h8' sx={{ textAlign: 'center', opacity: '95%', fontSize: '13px' }}>30-Day Money-Back Guarantee</Typography>
                    <Typography variant='h6' style={{ fontWeight: 'bold', flexDirection: 'row'}}>This course includes:</Typography>
                    <Box sx={{ display: 'block', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><AirplayIcon style={{ opacity: 0.55, marginRight: 5 }} />55 hours on-demand video</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><ArticleIcon style={{ opacity: 0.55, marginRight: 5 }} />80 articles</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><DriveFileMoveIcon style={{ opacity: 0.55, marginRight: 5 }} />26 downloadable resources</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><AutoStoriesIcon style={{ opacity: 0.55, marginRight: 5 }} />8 coding exercises</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><AllInclusiveIcon style={{ opacity: 0.55, marginRight: 5 }} />Full lifetime access</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><AdUnitsIcon style={{ opacity: 0.55, marginRight: 5 }} />Access on mobile and TV</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 0.5}}><EmojiEventsIcon style={{ opacity: 0.55, marginRight: 5 }} />Certificate of completion</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', mt: 1}}>
                        <Button sx={{ fontWeight: 'bold', width: '100%', textDecoration: 'underline', fontSize: '10px'}}>Apply Coupon</Button>
                        <Button sx={{ fontWeight: 'bold', width: '100%', textDecoration: 'underline', fontSize: '10px'}}>Gift this course</Button>
                    </Box>
                </Grid>
            </Box>
        </Box >
    )
}

export default CourseInfo