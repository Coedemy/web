import { formatTime } from 'app/utils/time'

export const calculateTotalHoursOfSection = (section) => {
  const totalHours = section.lectures.reduce((total, lecture) => {
    if (lecture.content.lectureContentType === 'VIDEO') return total + lecture.content.video.duration
    return total
  }, 0)
  return formatTime(totalHours)
}