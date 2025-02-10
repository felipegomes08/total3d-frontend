import axios from 'axios'
import decode from 'jwt-decode'
import { JWTProps } from 'src/@types'
import { authService } from 'src/services'

const api = axios.create({
  baseURL: process.env.API_URL || 'https://total3d-backend.herokuapp.com/',
  // baseURL: process.env.API_URL || 'http://localhost:3333',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedData: any = localStorage.getItem(`t3d-user`)

  const storageParsed = JSON.parse(storedData)

  if (
    !config?.url?.endsWith('/auth/signIn') &&
    !config?.url?.endsWith('/auth/send-code') &&
    !config?.url?.endsWith('/auth/verify-code') &&
    !config?.url?.endsWith('/auth/update-pass') &&
    !config?.url?.endsWith('/users/verify')
  ) {
    if (config?.url?.endsWith('/auth/refresh-token')) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!['x-refresh-token'] = `Bearer ${storageParsed.refreshToken}`
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.authorization = `Bearer ${storageParsed.token}`
    }
  }
  return config
})

api.interceptors.response.use(
  response => {
    return response
  },
  async err => {
    const originalRequest = err.config
    if (err?.response?.status === 401 && err?.config && !err?.config?._retry) {
      originalRequest._retry = true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storedData: any = localStorage.getItem(`t3d-user`)

      const storageParsed = JSON.parse(storedData)

      const { type } = decode<JWTProps>(storageParsed.refreshToken)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let res: any = {}

      if (type === 'rt') {
        res = await authService.refreshToken()
      } else {
        throw await err
      }

      const { user, token, refreshToken } = res.data

      localStorage.setItem(`t3d-user`, JSON.stringify({ user, token, refreshToken }))

      const newTokenDecoded = decode<JWTProps>(token)

      if (newTokenDecoded.type !== 'rt') {
        originalRequest.headers.authorization = `Bearer ${token}`
      } else {
        throw await err
      }

      const responseReq = await axios(originalRequest)
      return responseReq
    } else {
      throw await err
    }
  }
)
export { api }
