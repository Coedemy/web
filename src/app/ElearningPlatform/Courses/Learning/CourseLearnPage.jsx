import React, { useState, useRef, useEffect } from 'react'
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
  const [videoUrl, setVideoUrl] = useState()
  const [lecture, setLecture] = useState()

  const { slug, lectureId } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug } }))

  useEffect(() => {
    if (!isLoading) {
      data.course.sections.map(section => section.lectures.map(lecture => {
        if (lecture._id === lectureId && lecture.content.lectureContentType === 'VIDEO') {
          setVideoUrl(lecture.content.video.url)
          setTimeout(1000)
          playerRef.current.load()
        }
      }))
    }
  }, [isLoading])

  const chooseLecture = (lecture) => {
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
      setVideoUrl(lecture.content.video.url)
      setPoster(lecture.courseImage)
    }
    setTimeout(1000)
    playerRef.current.load()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <Box sx={{ flex: 3 }}>
        <CourseLearnVideo videoUrl={videoUrl} playerRef={playerRef} poster={poster} />
        <Box sx={{ pl: 3, pr: 3 }}>
          {isLoading ? <MatxLoading /> : <CourseLearnTabs course={data.course} lecture={lecture} />}
        </Box>
      </Box>
      <Box sx={{ flex: 1, backgroundColor: 'white', padding: '2px' }}>
        {
          isLoading ? (
            <MatxLoading />
          ) : (
            <>
              <Box sx={{ p: 2, fontSize: '1.2rem' }}><b>Course Content</b></Box>
              <CourseLearnSections chooseLecture={chooseLecture} course={data.course} />
            </>
          )
        }
      </Box>
    </Box>
  )
}

export default CourseLearnPage
