import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Player, ControlBar, BigPlayButton, ReplayControl, VolumeMenuButton } from 'video-react'


const VIDEO_HEIGHT = 600

const CourseLearnVideo = ({ videoUrl, poster, playerRef, visible }) => {
  const dispatch = useDispatch()
  const courseReducer = useSelector(state => state.course)


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
    <PlayerContainer>
      <Player
        ref={playerRef}
        poster={poster}
        fluid={false}
        width='100%'
        height='100%'
        src={videoUrl}
        className='react-player'
      >
        <ControlBar autoHide={false}>
          <ReplayControl seconds={10} order={2.2} />
          <VolumeMenuButton vertical />
        </ControlBar>
        <BigPlayButton position='center' />
      </Player>
    </PlayerContainer>
  )
}

export default CourseLearnVideo