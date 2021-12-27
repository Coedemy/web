import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, useMutation } from 'react-query'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Player, ControlBar, BigPlayButton, ReplayControl, VolumeMenuButton } from 'video-react'
import Hls from 'hls.js';

import { MatxLoading, CircularProgressWithLabel } from 'app/components'
import { searchCourse } from 'app/http/course'
import { finishLectureRequest } from 'app/http/user'
import { loadCurrentLecture, trackTime, startVideo, pauseVideo } from 'app/redux-toolkit/slices/courseSlice'

import CourseLearnSections from './CourseLearnSections'
// import CourseLearnVideo from './CourseLearnVideo'
import CourseLearnArticle from './CourseLearnArticle'
import CourseLearnTabs from './CourseLearnTabs'
import CourseLockedLecture from './CourseLockedLecture'
import CourseInitialization from './CourseInitialization'
import { finishALecture } from 'app/redux-toolkit/slices/userSlice'

const TOPBAR_HEIGHT = 64
const VIDEO_HEIGHT = 600


class HLSSource extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls();
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }
}

const LectureStatus = {
  INIT: 'INIT',
  VIDEO: 'VIDEO',
  ARTICLE: 'ARTICLE',
  LOCKED: 'LOCKED'
}

const Scrollable = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: `calc(100vh - ${TOPBAR_HEIGHT}px)`
}))

// const PlayerContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   height: `${VIDEO_HEIGHT}px`,
//   backgroundColor: '#f7f7f7'
// }))

const CourseLearnPage = () => {
  const authReducer = useSelector(state => state.auth)
  const userReducer = useSelector(state => state.user)
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
  const [videoEnded, setVideoEnded] = useState(false)

  const courseReducer = useSelector(state => state.course)
  const { slug, lectureId } = useParams()
  const { data, isLoading } = useQuery(`searchCourse${slug}`, searchCourse.bind(this, { queries: { slug }, userId: authReducer.user.userId }))
  const { mutate } = useMutation(finishLectureRequest, {
    onSuccess: autoChangeLecture
  })

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
      setVideoUrl(lecture.content.video.url)
      setPoster(lecture.courseImage)
      setArticleContent('')
      isVideo = true
    }
    playerRef.current.load()
    setTimeout(1000)
    setVideoEnded(false)
    setCurrentLecture(lecture)
    dispatch(trackTime(0))
    dispatch(loadCurrentLecture({ lectureId: lecture._id, title: lecture.title, isVideo }))
  }

  useEffect(() => {
    if (!playerRef) return
    playerRef.current.pause()
    playerRef.current.subscribeToStateChange(handleStateChange)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      data.course.sections.map(section => section.lectures.map(lecture => {
        if (lecture._id === lectureId) {
          loadLecture(lecture)
        }
      }))
    }
  }, [isLoading])

  useEffect(() => {
    const paused = playerRef.current?.getState().player.paused
    if (paused) {
      dispatch(pauseVideo())
    }
    else {
      dispatch(startVideo())
    }
  }, [playerRef.current?.getState().player.paused])

  useEffect(() => {
    const pauseVideo = courseReducer.pauseVideo
    if (pauseVideo) playerRef.current.pause()
  }, [courseReducer.pauseVideo])

  useEffect(() => {
    if (!videoEnded) return
    if (userReducer.myLearning.some(course => course._id === data.course._id)) {
      console.log('ended')
      mutate({ lectureId })
      dispatch(finishALecture({ lectureId }))
    }
  }, [videoEnded])

  const autoChangeLecture = () => {

  }

  const handleStateChange = (state, prevState) => {
    if (!courseReducer.currentLecture.isVideo) return
    const previousTime = courseReducer.currentLecture.currentTime
    const currentTime = parseInt(state.currentTime)
    const videoIsPlaying = previousTime !== currentTime
    if (videoIsPlaying) {
      dispatch(trackTime(currentTime))
    }

    //if this course was purchased, show learning progress
    if (state.ended && !videoEnded) {
      setVideoEnded(true)
    }
  }

  const chooseLecture = (lecture) => {
    const pathnameArray = location.pathname.split('/')
    pathnameArray.pop()

    const lectureUrl = pathnameArray.join('/') + '/' + lecture._id
    history.push(lectureUrl)
    // scrollToTop()
    loadLecture(lecture)
  }

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: lectureStatus === LectureStatus.VIDEO ? `${VIDEO_HEIGHT}px` : '0px',
            backgroundColor: '#f7f7f7',
            opacity: lectureStatus === LectureStatus.VIDEO ? 1 : 0
          }}>
          {/* <Player
            ref={playerRef}
            poster={poster}
            fluid={false}
            width='100%'
            height='100%'
            src={videoUrl}
          >
            <ControlBar autoHide={false}>
              <ReplayControl seconds={10} order={2.2} />
              <VolumeMenuButton vertical />
            </ControlBar>
            <BigPlayButton position='center' />
          </Player> */}
          <Player ref={playerRef}>
            <HLSSource
              isVideoChild
              src="//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
            />
          </Player>
        </Box>
        {/* } */}


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
              <Box sx={{ p: 2, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <b>Course Content</b>
                {
                  userReducer.myLearning.some(c => c._id === data.course._id) ? (
                    <CircularProgressWithLabel value={userReducer.learningProcess.length * 100 / data.course.totalLectures < 100 ? userReducer.learningProcess.length * 100 / data.course.totalLectures : 100} />
                  ) : <Box />
                }

              </Box>
              <CourseLearnSections chooseLecture={chooseLecture} course={data.course} />
            </Box>
          )
        }
      </Scrollable>
    </Box >
  )
}

export default CourseLearnPage
