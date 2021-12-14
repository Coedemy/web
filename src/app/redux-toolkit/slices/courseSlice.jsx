import { createSlice } from '@reduxjs/toolkit'

const courseSlice = createSlice({
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
      const { lectureId, isVideo } = action.payload
      state.isLoading = true
      state.currentLecture.lectureId = lectureId
      state.currentLecture.isVideo = isVideo
      state.currentLecture.currentTime = 0
      state.isLoading = false
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
  loadCurrentLecture,
  trackTime
} = actions
export default reducer