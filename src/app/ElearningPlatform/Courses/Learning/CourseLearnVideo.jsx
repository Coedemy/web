import React, { useEffect } from 'react'
import {Box} from '@mui/material'
import { Player, ControlBar } from 'video-react'

// const sources = {
//   sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
//   bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
//   bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
//   test: 'http://media.w3.org/2010/05/video/movie_300.webm'
// }

const CourseLearnVideo = ({ videoSrc, poster, playerRef }) => {

  useEffect(() => {
    pause()
  }, [])

  // const setMuted = (muted) => {
  //   return () => {
  //     playerRef.current.muted = muted
  //   }
  // }

  // const handleStateChange = (state) => {
  //   // copy player state to this component's state
  //   playerRef = state
  // }

  // const play = () => {
  //   playerRef.current.play()
  // }

  const pause = () => {
    playerRef.current.pause()
  }

  // const load = () => {
  //   playerRef.load()
  // }

  // const changeCurrentTime = (seconds) => {
  //   return () => {
  //     const { player } = playerRef.current.getState()
  //     player.seek(player.currentTime + seconds)
  //   }
  // }

  // const seek = (seconds) => {
  //   return () => {
  //     playerRef.current.seek(seconds)
  //   }
  // }

  // const changePlaybackRateRate = (steps) => {
  //   return () => {
  //     const { player } = player.getState()
  //     player.playbackRate = player.playbackRate + steps
  //   }
  // }

  // const changeVolume = (steps) => {
  //   return () => {
  //     const { player } = player.getState()
  //     player.volume = player.volume + steps
  //   }
  // }

  // const changeSource = (name) => {
  //   return () => {
  //     setSource(sources[name])
  //     playerRef.load()
  //   }
  // }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '500px', backgroundColor: '#f7f7f7'}}>
      <Player
        ref={playerRef}
        poster={poster}
        fluid={false}
        width={1000}
        height={500}
      >
        <source src={videoSrc} />
        <ControlBar autoHide={false} />
      </Player>
    </Box>
  )
}

export default CourseLearnVideo