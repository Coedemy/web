import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { Box, Typography, TextField, Rating, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import { reviewCourseRequest } from 'app/http/course'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

const CourseLearnOverview = ({ course }) => {
  const [numberOfStars, setNumberOfStars] = useState(0)
  const [comment, setComment] = useState('')
  const [hover, setHover] = useState(-1)
  const [canSave, setCanSave] = useState(true)

  const { mutate } = useMutation(reviewCourseRequest, {
    onSuccess: onRatingSuccessfully
  })

  const onRatingSuccessfully = (data) => {
    // console.log({ data })
    // console.log('success')
  }

  const onRating = () => {
    mutate({ courseId: course._id, numberOfStars }, comment)
    setCanSave(false)
  }

  const onCommentChange = (e) => {
    setComment(e.target.value)
    setCanSave(true)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
      <Typography variant='h5' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
        How would you rate your experience with the course so far?
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '2rem' }}>
        <Typography variant='h6' gutterBottom>
          Select Rating:
        </Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name='hover-feedback'
            value={numberOfStars}
            precision={0.5}
            onChange={(event, newValue) => {
              setNumberOfStars(newValue)
              setCanSave(true)
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover)
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
            size='large'
          />
          {numberOfStars !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : numberOfStars]}</Box>
          )}
        </Box>
      </Box>
      <TextField sx={{ width: '60%' }} multiline rows={3} onChange={onCommentChange} placeholder='Tell us about your own personal experience taking this course. Was it a good match for you?' />
      <Box><Button disabled={!canSave} variant='contained' onClick={onRating}>Save</Button></Box>
    </Box>
  )
}

export default CourseLearnOverview
