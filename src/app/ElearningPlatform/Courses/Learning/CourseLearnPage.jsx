import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'

import CourseSectionLearn from './CourseSectionLearn'
import CourseLearnVideo from './CourseLearnVideo'
import CourseLearnTabs from './CourseLearnTabs'

const CourseLearnPage = () => {
  const playerRef = useRef()
  const [poster, setPoster] = useState()
  const [videoSrc, setVideoSrc] = useState('http://media.w3.org/2010/05/sintel/trailer.mp4')
  const [lecture, setLecture] = useState()

  const chooseVideo = (lecture) => {
    if (lecture.type !== 'video') {
      setVideoSrc('')
      setPoster('')
      console.log('not video')
    }
    else {
      setLecture(lecture)
      setVideoSrc(lecture.videoSrc)
      setPoster(lecture.courseImage)
    }
    playerRef.current.load()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <Box sx={{ flex: 3 }}>
        <CourseLearnVideo videoSrc={videoSrc} playerRef={playerRef} poster={poster} />
        <Box sx={{ pl: 3, pr: 3 }}>
          <CourseLearnTabs lecture={lecture} />
        </Box>
      </Box>
      <Box sx={{ flex: 1, backgroundColor: 'white', padding: '2px' }}>
        <Box sx={{p:3}}>Course Content</Box>
        <CourseSectionLearn chooseVideo={chooseVideo} />
      </Box>
    </Box>
  )
}

export default CourseLearnPage
