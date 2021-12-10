import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { MatxLoading } from 'app/components'
import { searchCourse } from 'app/http/course'
import { loadCurrentLecture } from 'app/redux-toolkit/slices/lectureSlice'

import CourseLearnSections from './CourseLearnSections'
import CourseLearnVideo from './CourseLearnVideo'
import CourseLearnArticle from './CourseLearnArticle'
import CourseLearnTabs from './CourseLearnTabs'

const Scrollable = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: 'calc(100vh - 100px)'
}))

const CourseLearnPage = () => {
  const [isVideoLecture, setIsVideoLecture] = useState(false)
  const playerRef = useRef()
  const contentContainerRef = useRef()
  const sectionsContainerRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [poster, setPoster] = useState()
  const [videoUrl, setVideoUrl] = useState()
  const [articleContent, setArticleContent] = useState('')
  const [lecture, setLecture] = useState()

  const { slug, lectureId } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug } }))

  // const scrollToTop = () => {
  //   contentContainerRef.current.scrollIntoView({ behavior: 'smooth' })
  //   sectionsContainerRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  useEffect(() => {
    if (!isLoading) {
      data.course.sections.map(section => section.lectures.map(lecture => {
        if (lecture._id === lectureId) {
          // scrollToTop()
          const lectureContentType = lecture.content.lectureContentType
          setIsVideoLecture(lectureContentType === 'VIDEO')
          if (lectureContentType === 'VIDEO') {
            setVideoUrl(lecture.content.video.url)
            dispatch(loadCurrentLecture({ lectureId: lecture._id, isVideo: true }))
            setTimeout(1000)
            playerRef.current.load()
          }
          else if (lectureContentType === 'ARTICLE') {
            setArticleContent(lecture.content.articleContent)
          }
        }
      }))
    }
  }, [isLoading])

  const chooseLecture = (lecture) => {
    const pathnameArray = location.pathname.split('/')
    pathnameArray.pop()

    const lectureUrl = pathnameArray.join('/') + '/' + lecture._id
    history.push(lectureUrl)
    // scrollToTop()
    setIsVideoLecture(lecture.content.lectureContentType === 'VIDEO')
    if (lecture.content.lectureContentType !== 'VIDEO') {
      setVideoUrl('')
      setPoster('')
    }
    else {
      setLecture(lecture)
      dispatch(loadCurrentLecture({ lectureId: lecture._id, isVideo: true, playerRef }))
      setVideoUrl(lecture.content.video.url)
      setPoster(lecture.courseImage)
    }
    setTimeout(1000)
    playerRef.current.load()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Scrollable sx={{ flex: 3 }} ref={contentContainerRef}>
        <CourseLearnVideo videoUrl={videoUrl} playerRef={playerRef} poster={poster} visible={isVideoLecture} />
        {!isVideoLecture ? <CourseLearnArticle content={articleContent} /> : <></>}
        <Box sx={{ pl: 3, pr: 3 }}>
          {isLoading ? <MatxLoading /> : <CourseLearnTabs course={data.course} lecture={lecture} />}
        </Box>
      </Scrollable>
      <Scrollable sx={{ flex: 1, backgroundColor: 'white', padding: '2px', }} ref={sectionsContainerRef}>
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
      </Scrollable>
    </Box >
  )
}

export default CourseLearnPage
