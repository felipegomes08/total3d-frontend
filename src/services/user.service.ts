import { AxiosResponse } from 'axios'

import { api } from './api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findAll(filter?: string): Promise<AxiosResponse<any>> {
  return api({
    url: filter ? `/users?${filter}` : '/users',
    method: 'GET',
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findOne(id: any): Promise<AxiosResponse<any>> {
  return api({
    url: `/users/${id}`,
    method: 'GET',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function create(data: any): Promise<AxiosResponse<any>> {
  return api({
    url: '/auth/signUp',
    method: 'POST',
    data,
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function register(data: any): Promise<AxiosResponse<any>> {
  console.log(data)
  return api({
    url: '/auth/register',
    method: 'POST',
    data,
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function block(id: string, data: any): Promise<AxiosResponse<any>> {
  return api({
    url: `/users/status/${id}`,
    method: 'PUT',
    data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deleteUser(id: string): Promise<AxiosResponse<any>> {
  return api({
    url: `/users/${id}`,
    method: 'DELETE',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function update(id: string, data: any): Promise<AxiosResponse<any>> {
  return api({
    url: `/users/${id}`,
    method: 'PUT',
    data,
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateTentativas(id: string, data: any): Promise<AxiosResponse<any>> {
  return api({
    url: `/users/downloads/${id}`,
    method: 'PUT',
    data,
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verify(id: string): Promise<AxiosResponse<any>> {
  return api({
    url: `/users/verify/${id}`,
    method: 'GET',
  })
}
