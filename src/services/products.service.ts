/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'

import { api } from './api'

export function findAll(userId?: string): Promise<AxiosResponse<any>> {
  return api({
    url: !userId ? '/products' : `/products/${userId}`,
    method: 'GET',
  })
}

export function findItems(path?: string, nct?: string): Promise<AxiosResponse<any>> {
  return api({
    url: `/products/items`,
    method: 'POST',
    data: { path, nct },
  })
}

export function createOne(data: any): Promise<AxiosResponse<any>> {
  return api({
    url: '/products',
    method: 'POST',
    data,
  })
}
