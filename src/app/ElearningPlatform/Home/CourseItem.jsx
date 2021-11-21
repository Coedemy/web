import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, CardContent, CardMedia, Rating, Box, Chip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import { formatToVND } from 'app/utils/formatter'
import { orange } from 'app/utils/color'

const CourseTitle = styled.strong`
  font-size: 18px;
  overflow: hidden;
  color: ${orange};
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const CourseDescription = styled.strong`
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const CoursePrice = styled.strong`
  font-size: 14px;
  color: ${orange};
`

const RatingNumber = styled.strong`
  font-size: 14px;
  color: ${orange};
  margin-right: 8px;
`


const CourseItem = ({ course }) => {

  return (
    <Link to={{
      pathname: `/courses/${course.id}`,
      state: {
        courseId: course.id,
        courseImage: course.courseImage
      }
    }}>
      <Card sx={{ minHeight: 325, borderRadius: 2 }}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='200'
          image={course.courseImage}
          sx={{ border: '1px solid lightgray' }}
        />
        <CardContent>
          <CourseTitle>{course.title}</CourseTitle>
          <Box sx={{ marginBottom: '8px' }} />
          <CourseDescription>{course.description}</CourseDescription>
          <Box sx={{ marginBottom: '8px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <RatingNumber>{course.stars}</RatingNumber>
            <Rating
              name="text-feedback"
              value={course.stars}
              readOnly
              precision={0.5}
              size='small'
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 1 }}>({formatToVND(course.numberOfRating)})</Box>
          </Box>
          <Box sx={{ marginBottom: '8px' }} />
          <Box sx={{display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>{course.instructor}</Box>
            <CoursePrice>
              {
                course.price === 0 ? <Chip label='Free' color='success' /> : `$${course.price}.99`
              }
            </CoursePrice>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CourseItem