import { AxiosResponse } from 'axios'

import { api } from './api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findAll(): Promise<AxiosResponse<any>> {
  return api({
    url: '/users-favorite',
    method: 'GET',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addFavorite(directoryOfImage: string): Promise<AxiosResponse<any>> {
  return api({
    url: '/users-favorite',
    method: 'POST',
    data: { directoryOfImage },
  })
}
