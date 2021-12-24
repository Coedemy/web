import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SYSTEM_URL,
})

const httpRequest = async ({
  endpoint,
  method = 'get',
  bodyParameters,
  query,
  requireToken = false,
  isFormData = false
}) => {
  let config

  if (requireToken) {
    const userInfoJSON = localStorage.getItem('userInfo')
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON)
      const accessToken = userInfo.accessToken

      if (accessToken) {
        config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
          },
          params: query,
        }
      }
    }
  }

  if (method === 'get' || method === 'GET') {
    const response = await axiosClient[method](endpoint, config)
    return response.data
  }

  const response = await axiosClient[method](endpoint, bodyParameters, config)
  return response.data
}

export default httpRequest