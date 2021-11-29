import React, { useState, useRef } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'

import { MatxLoading } from 'app/components'
import { searchCourse } from 'app/http/course'

import CourseLearnSections from './CourseLearnSections'
import CourseLearnVideo from './CourseLearnVideo'
import CourseLearnTabs from './CourseLearnTabs'

const CourseLearnPage = () => {
  const playerRef = useRef()
  const history = useHistory()
  const location = useLocation()
  const [poster, setPoster] = useState()
  const [videoUrl, setVideoUrl] = useState('http://media.w3.org/2010/05/sintel/trailer.mp4')
  const [lecture, setLecture] = useState()

  const { slug, lectureId } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug } }))

  const chooseVideo = (lecture) => {
    const pathnameArray = location.pathname.split('/')
    pathnameArray.pop()
    
    const lectureUrl = pathnameArray.join('/') + '/' + lecture._id
    history.push(lectureUrl)
    if (lecture.content.lectureContentType !== 'VIDEO') {
      setVideoUrl('')
      setPoster('')
    }
    else {
      setLecture(lecture)
      setVideoUrl(lecture.content.videoUrl)
      setPoster(lecture.courseImage)
    }
    playerRef.current.load()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <Box sx={{ flex: 3 }}>
        <CourseLearnVideo videoUrl={videoUrl} playerRef={playerRef} poster={poster} />
        <Box sx={{ pl: 3, pr: 3 }}>
          <CourseLearnTabs lecture={lecture} />
        </Box>
      </Box>
      <Box sx={{ flex: 1, backgroundColor: 'white', padding: '2px' }}>
        {
          isLoading ? (
            <MatxLoading />
          ) : (
            <>
              <Box sx={{ p: 2, fontSize: '1.2rem' }}><b>Course Content</b></Box>
              <CourseLearnSections chooseVideo={chooseVideo} course={data.course} />
            </>
          )
        }
      </Box>
    </Box>
  )
}

export default CourseLearnPage
