import { createSlice } from '@reduxjs/toolkit'

const lectureSlice = createSlice({
  name: 'lecture',
  initialState: {
    isLoading: true,
    currentLecture: {
      isVideo: true,
      lectureId: null,
      currentTime: 0
    },
    error: null,
  },
  reducers: {
    loadCurrentLecture: (state, action) => {
      const { lectureId, isVideo, playerRef } = action.payload
      state.currentLecture.lectureId = lectureId
      state.currentLecture.isVideo = isVideo
      state.currentLecture.currentTime = 0
      return state
    },

    trackTime: (state, action) => {
      const currentTime = action.payload
      const currentLecture = state.currentLecture
      currentLecture.currentTime = currentTime
      state.currentLecture = currentLecture
      return state
    }
  }
})

const { reducer, actions } = lectureSlice
export const {
  loadCurrentLecture,
  trackTime
} = actions
export default reducer