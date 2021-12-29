import React from 'react'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Rating, Box, Chip, Button, Typography, Tooltip, Zoom, IconButton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styled from 'styled-components'
import CheckIcon from '@mui/icons-material/Check'
import crypto from 'crypto'

import { LightTooltip } from 'app/components'
import { formatToVND } from 'app/utils/formatter'
import { orange } from 'app/utils/color'
import { addToCart, toggleFavorite } from 'app/redux-toolkit/slices/userSlice'
import { toggleFavoriteRequest, updateCartRequest } from 'app/http/user'

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

const CourseInfoModal = ({ course }) => {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => state.user)
  const authReducer = useSelector(state => state.auth)
  const { mutate: mutateUpdateCart } = useMutation(updateCartRequest, {
    mutationKey: 'updateCart',
  })

  const { mutate: mutateToggleFavorite } = useMutation(toggleFavoriteRequest, {
    mutationKey: 'toggleFavorite',
  })


  const handleAddToCart = () => {
    dispatch(addToCart({ item: course }))
    if (authReducer.accessToken) {
      mutateUpdateCart({ courseId: course._id, updateType: 'add' })
    }
  }

  const toggleFavoriteButton = (course) => {
    if (authReducer.accessToken) {
      dispatch(toggleFavorite({ course }))
      mutateToggleFavorite({ courseId: course._id })
    }
  }

  return (
    <Box>
      <CardContent>
        <Box>
          <CourseTitle>{course.title}</CourseTitle>
          <Box sx={{ marginBottom: '3px' }} />
          <Typography style={{ color: '#03FF78', fontSize: '13px' }}>December 2021</Typography>
          <Typography style={{ fontSize: '10px', opacity: '50%' }}>All Levels . Subtitles</Typography>
          <Box sx={{ marginBottom: '4px' }} />
          <CourseDescription>{course.description}</CourseDescription>
          <Box sx={{ marginBottom: '4px' }} />
          {
            course.learningGoals.slice(0, 3).map(goal => (
              <Box key={crypto.randomBytes(16).toString('hex')} style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckIcon />
                <Typography style={{ fontSize: '13px', opacity: '95%', marginLeft: '5px' }}>{goal}</Typography>
              </Box>
            ))
          }
        </Box>
      </CardContent>
      <Box>
        {
          userReducer.myLearning.some(learningCourse => course._id === learningCourse._id) ? (
            <Link to={`/courses/${course.slug}/lectures/${course.firstLecture}`}><Button variant='contained' style={{ marginLeft: '20px', width: '200px', marginBottom: '15px' }}>Learn</Button></Link>
          ) :
            userReducer.cart.some(cartCourse => course._id === cartCourse._id) ? (
              <Link to='/cart'><Button variant='contained' style={{ marginLeft: '20px', width: '200px', marginBottom: '15px' }}>Go to cart</Button></Link>
            ) : (
              <Button onClick={handleAddToCart} variant='contained' style={{ marginLeft: '20px', width: '200px', marginBottom: '15px' }}>Add To Cart</Button>
            )
        }
        {
          authReducer.accessToken ? (
            <IconButton onClick={toggleFavoriteButton.bind(this, course)} style={{ marginBottom: '15px' }}>
              {
                userReducer.wishlist.some(c => c._id === course._id) ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large' />
              }
            </IconButton>
          ) : <></>
        }
      </Box>
    </Box>
  )
}

const CourseItem = ({ course, index }) => {

  console.log({ course })
  return (
    <LightTooltip TransitionComponent={Zoom} placement={`${(index + 1) % 3 === 0 ? 'left' : 'right'}`} title={<CourseInfoModal course={course} />}>
      <Link to={`/courses/${course.slug}`}>
        <Button sx={{ padding: '0', width: '100%' }}>
          <Card sx={{ borderRadius: 2, width: '100%' }}>
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
                <Typography>{course.instructor ? course.instructor.username : 'Tran Phuong Duy'}</Typography>
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