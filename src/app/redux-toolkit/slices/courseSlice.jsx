import { createSlice } from '@reduxjs/toolkit'

const courseSlice = createSlice({
  name: 'lecture',
  initialState: {
    isLoading: true,
    currentLecture: {
      isVideo: true,
      lectureId: '',
      title: '',
      currentTime: 0
    },
    pauseVideo: true,
    error: null,
  },
  reducers: {

    loadCurrentLecture: (state, action) => {
      const { lectureId, isVideo, title } = action.payload
      state.isLoading = true
      state.currentLecture.lectureId = lectureId
      state.currentLecture.isVideo = isVideo
      state.currentLecture.title = title
      state.currentLecture.currentTime = 0
      state.pauseVideo = true
      state.isLoading = false
      return state
    },

    startVideo: (state, action) => {
      state.pauseVideo = false
      return state
    },

    pauseVideo: (state, action) => {
      state.pauseVideo = true
      return state
    },

    trackTime: (state, action) => {
      state.isLoading = true
      const currentTime = action.payload
      const currentLecture = state.currentLecture
      currentLecture.currentTime = currentTime
      state.currentLecture = currentLecture
      state.isLoading = false
      return state
    }
  }
})

const { reducer, actions } = courseSlice
export const {
  startVideo,
  pauseVideo,
  loadCurrentLecture,
  trackTime
} = actions
export default reducer