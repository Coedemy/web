export const formatTime = (seconds) => {
  const time = new Date(seconds * 1000).toISOString().substr(14, 5)
  return time
}