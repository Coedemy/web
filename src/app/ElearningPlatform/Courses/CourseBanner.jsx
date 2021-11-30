import React from 'react'
import { Box, Grid, Typography, Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import LanguageIcon from '@mui/icons-material/Language';
import styled from 'styled-components'

import { formatToVND } from 'app/utils/formatter'
import coursesDataList from '../fakeData/coursesDataList'
import { orange } from 'app/utils/color';

const RatingNumber = styled.strong`
  font-size: 14px;
  color: ${orange};
  margin-right: 8px;
`

const UndelinedText = styled.span`
  text-decoration: underline;
`

const CourseBanner = ({ course }) => {

  return (
    <Grid container spacing={2} style={{ backgroundColor: '#212944', padding: 32, color: 'white' }}>
      <Grid item xs={12}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>{course.title}</Typography>
        <Box sx={{ mb: 1 }} />
        <Typography variant='h6'>{course.description}</Typography>
        <Box sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <RatingNumber>{course.averageRating}</RatingNumber>
          <Rating
            name="text-feedback"
            value={course.averageRating}
            readOnly
            precision={0.5}
            size='small'
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
          />
          <Box sx={{ ml: 1 }}>
            <UndelinedText>({formatToVND(course.reviews.length)} ratings)</UndelinedText>&nbsp;&nbsp;&nbsp;1000 students</Box>
        </Box>
        <Box sx={{ mb: 1 }} />
        {/* <Box>Created by&nbsp;<UndelinedText>{course.instructor}</UndelinedText></Box> */}
        <Box>Created by&nbsp;<UndelinedText>Tran Phuong Duy</UndelinedText></Box>
        <Box sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><AccessAlarmsIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;Last updated {new Date(course.updatedAt).toLocaleDateString('es-CL')}</Box >&nbsp;&nbsp;&nbsp;
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><LanguageIcon style={{ opacity: 0.55 }} />&nbsp;&nbsp;{course.language}</Box>
        </Box>
      </Grid>
    </Grid >
  )
}

export default CourseBanner
