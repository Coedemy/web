import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled as muiStyled } from '@mui/material/styles'
import styled from 'styled-components'
import { Card, CardContent, CardMedia, Rating, Box, Chip, Button, Typography, Tooltip, Zoom } from '@mui/material'
import { tooltipClasses } from '@mui/material/Tooltip'
import StarIcon from '@mui/icons-material/Star'

import { formatToVND } from 'app/utils/formatter'
import { orange } from 'app/utils/color'
import { addToCart } from 'app/redux-toolkit/slices/userSlice'

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
  text-align: left;
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

const LightTooltip = muiStyled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[3],
  },
}))

const CourseInfoModal = ({ course }) => {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => state.user)

  const handleAddToCart = () => {
    dispatch(addToCart({ item: course }))
  }

  console.log(userReducer.cart)

  return (
    <Box sx={{ p: 2 }}>
      <Typography>{course.description}</Typography>
      <Box sx={{ m: 4 }} />
      {
        userReducer.cart.some(cartCourse => course._id === cartCourse._id) ? (
          <Button variant='contained'>Go to cart</Button>
        ) : (
          <Button onClick={handleAddToCart} variant='contained'>Add To Cart</Button>
        )
      }

    </Box>
  )
}

const CourseItem = ({ course, index }) => {

  return (
    <LightTooltip TransitionComponent={Zoom} placement={`${(index + 1) % 3 === 0 ? 'left' : 'right'}`} title={<CourseInfoModal course={course} />} >
      <Link to={`/courses/${course.slug}`}>
        <Button sx={{ padding: '0' }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardMedia
              component='img'
              alt="course's image"
              height='200'
              image={course.courseImage}
              sx={{ border: '1px solid lightgray' }}
            />
            <CardContent>
              <Box sx={{ height: '120px' }}>
                <CourseTitle>{course.title}</CourseTitle>
                <Box sx={{ marginBottom: '8px' }} />
                <CourseDescription>{course.description}</CourseDescription>
              </Box>
              <Box sx={{ marginBottom: '8px' }} />
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <RatingNumber>{course.stars}</RatingNumber>
                <Rating
                  name='text-feedback'
                  value={course.averageRating}
                  readOnly
                  precision={0.5}
                  size='small'
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                />
                <Box sx={{ ml: 1 }}>({formatToVND(course.reviews.length)})</Box>
              </Box>
              <Box sx={{ marginBottom: '8px' }} />
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* <Box>{course.instructor}</Box> */}
                <Typography>Tran Phuong Duy</Typography>
                <CoursePrice>
                  {
                    course.price === 0 ? <Chip label='Free' color='success' /> : `$${course.price}.99`
                  }
                </CoursePrice>
              </Box>
            </CardContent>
          </Card>
        </Button >
      </Link>
    </LightTooltip >
  )
}

export default CourseItem