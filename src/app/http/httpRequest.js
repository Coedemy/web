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
}) => {
  let config

  if (requireToken) {
    const accessToken = JSON.parse(localStorage.getItem('authInfo'))[
      'accessToken'
    ]
    config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
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