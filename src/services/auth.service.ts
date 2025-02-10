import { AxiosResponse } from 'axios'

import { api } from './api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function signIn(email: string, password: string): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/signIn',
    method: 'POST',
    data: { email, password },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function signUp(data: any): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/singUp',
    method: 'POST',
    data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendEmail(data: any): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/send-code',
    method: 'POST',
    data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyCode(data: any): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/verify-code',
    method: 'POST',
    data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updatedPass(data: any): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/update-pass',
    method: 'POST',
    data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function refreshToken(): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/refresh-token',
    method: 'POST',
  })
}
