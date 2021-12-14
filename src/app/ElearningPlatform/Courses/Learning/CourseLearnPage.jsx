import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { MatxLoading } from 'app/components'
import { searchCourse } from 'app/http/course'
import { loadCurrentLecture } from 'app/redux-toolkit/slices/courseSlice'

import CourseLearnSections from './CourseLearnSections'
import CourseLearnVideo from './CourseLearnVideo'
import CourseLearnArticle from './CourseLearnArticle'
import CourseLearnTabs from './CourseLearnTabs'
import CourseLockedLecture from './CourseLockedLecture'
import CourseInitialization from './CourseInitialization'

const topbarHeight = 64

const Scrollable = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: `calc(100vh - ${topbarHeight}px)`
}))

const LectureStatus = {
  INIT: 'INIT',
  VIDEO: 'VIDEO',
  ARTICLE: 'ARTICLE',
  LOCKED: 'LOCKED'
}

const CourseLearnPage = () => {
  const authReducer = useSelector(state => state.auth)
  const [lectureStatus, setLectureStatus] = useState(LectureStatus.INIT)
  const playerRef = useRef()
  const contentContainerRef = useRef()
  const sectionsContainerRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [poster, setPoster] = useState()
  const [videoUrl, setVideoUrl] = useState()
  const [articleContent, setArticleContent] = useState('')
  const [currentLecture, setCurrentLecture] = useState()
  const [currentCourse, setCurrentCourse] = useState()

  console.log(authReducer)
  const { slug, lectureId } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug }, userId: authReducer.user.userId }))

  // const scrollToTop = () => {
  //   contentContainerRef.current.scrollIntoView({ behavior: 'smooth' })
  //   sectionsContainerRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  const loadLecture = (lecture) => {
    if (lecture.isLocked) {
      setLectureStatus(LectureStatus.LOCKED)
      setVideoUrl('')
      return
    }

    let isVideo
    if (lecture.content.lectureContentType !== 'VIDEO') {
      setLectureStatus(LectureStatus.ARTICLE)
      setVideoUrl('')
      setPoster('')
      setArticleContent(lecture.content.articleContent)
      isVideo = false
    }
    else {
      setLectureStatus(LectureStatus.VIDEO)
      setCurrentLecture(lecture)
      setVideoUrl(lecture.content.video.url)
      setPoster(lecture.courseImage)
      isVideo = true
    }
    setTimeout(1000)
    dispatch(loadCurrentLecture({ lectureId: lecture._id, isVideo }))
  }

  useEffect(() => {
    if (!isLoading) {
      data.course.sections.map(section => section.lectures.map(lecture => {
        if (lecture._id === lectureId) {
          loadLecture(lecture)
        }
      }))
    }
  }, [isLoading])

  const chooseLecture = useCallback((lecture) => {
    const pathnameArray = location.pathname.split('/')
    pathnameArray.pop()

    const lectureUrl = pathnameArray.join('/') + '/' + lecture._id
    history.push(lectureUrl)
    // scrollToTop()
    loadLecture(lecture)
  }, [location])

  const renderLectureContent = () => {
    switch (lectureStatus) {
      case LectureStatus.INIT:
        return <CourseInitialization />
      case LectureStatus.LOCKED:
        return <CourseLockedLecture course={data.course} />
      case LectureStatus.ARTICLE:
        return <CourseLearnArticle content={articleContent} />
      default:
        return <></>
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Scrollable sx={{ flex: 3 }} ref={contentContainerRef}>
        {renderLectureContent()}
        <CourseLearnVideo videoUrl={videoUrl} playerRef={playerRef} poster={poster} visible={lectureStatus === LectureStatus.VIDEO} />
        <Box sx={{ pl: 3, pr: 3 }}>
          {isLoading ? <MatxLoading /> : <CourseLearnTabs course={data.course} lecture={currentLecture} />}
        </Box>
      </Scrollable>
      <Scrollable sx={{ flex: 1, backgroundColor: 'white', padding: '2px', }} ref={sectionsContainerRef}>
        {
          isLoading ? (
            <MatxLoading />
          ) : (
            <Box>
              <Box sx={{ p: 2, fontSize: '1.2rem' }}><b>Course Content</b></Box>
              <CourseLearnSections chooseLecture={chooseLecture} course={data.course} />
            </Box>
          )
        }
      </Scrollable>
    </Box >
  )
}

export default CourseLearnPage
