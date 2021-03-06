import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Box, Typography, Link as MuiLink, Button } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { styled } from '@mui/material/styles'

import { updateCartRequest } from 'app/http/user'
import { addToCart } from 'app/redux-toolkit/slices/userSlice'
// import { trackTime } from 'app/redux-toolkit/slices/courseSlice'

const LECTURE_HEIGHT = 600

const CourseLockedLecture = ({ course }) => {

  const LectureContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: `${LECTURE_HEIGHT}px`,
    backgroundColor: '#f7f7f7'
  }))

  const Article = styled(Box)(({ theme }) => ({
    paddingTop: '20px',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }))

  const dispatch = useDispatch()
  const history = useHistory()
  const authReducer = useSelector(state => state.auth)
  const userReducer = useSelector(state => state.user)
  const { mutate: mutateUpdateCart } = useMutation(updateCartRequest, {
    mutationKey: 'updateCart',
  })

  const handleAddToCart = () => {
    dispatch(addToCart({ item: course }))
    if (authReducer.accessToken) {
      mutateUpdateCart({ courseId: course._id, updateType: 'add' })
    }
    history.push('/')
  }

  return (
    <LectureContainer>
      <Article>
        <LockIcon fontSize='large' />
        <Box sx={{ m: 2 }} />
        <Typography variant='h4'>Lecture content locked</Typography>
        <Box sx={{ m: 2 }} />
        <Box>
          {/* <Button variant='outlined' sx={{ mr: 2 }}>Login</Button> */}
          {
            userReducer.cart.some(cartCourse => course._id === cartCourse._id) ? (
              <Link to='/cart'><Button variant='contained'>Go to cart</Button></Link>
            ) : (
              <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
            )
          }

        </Box>
      </Article>
    </LectureContainer >
  )
}

export default CourseLockedLecture