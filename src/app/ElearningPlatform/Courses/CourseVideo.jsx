import React, { useEffect, useState, useRef } from 'react'
import { Player, ControlBar } from 'video-react'


const CourseVideo = ({ videoSrc }) => {
  const playerRef = useRef()

  useEffect(() => {
    console.log('pause')
    pause()
  }, [])

  const setMuted = (muted) => {
    return () => {
      playerRef.current.muted = muted
    }
  }

  const play = () => {
    playerRef.current.play()
  }

  const pause = () => {
    playerRef.current.pause()
  }

  const load = () => {
    playerRef.load()
  }

  const changeCurrentTime = (seconds) => {
    return () => {
      const { player } = playerRef.current.getState()
      player.seek(player.currentTime + seconds)
    }
  }

  const seek = (seconds) => {
    return () => {
      playerRef.current.seek(seconds)
    }
  }

  const changePlaybackRateRate = (steps) => {
    return () => {
      const { player } = player.getState()
      player.playbackRate = player.playbackRate + steps
    }
  }

  const changeVolume = (steps) => {
    return () => {
      const { player } = player.getState()
      player.volume = player.volume + steps
    }
  }

  return (
    <div>
      <Player
        ref={playerRef}
      // autoPlay
      >
        <source src={videoSrc} />
        <ControlBar autoHide={false} />
      </Player>
    </div>
  )
}

export default CourseVideo