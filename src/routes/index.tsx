import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import {
  NotFound,
  ForgotPassword,
  Classificados,
  Home,
  ItemsProducts,
  Login,
  Admin,
} from 'src/pages'
import Favorites from 'src/pages/Favorites'

export interface ReactRouterRoute {
  path: string
  component: React.FC<RouteComponentProps>
  exact: boolean
  private: boolean
}

export const defaultRoutePath = '/404'

export const rootRoutes: Array<ReactRouterRoute> = [
  {
    path: '/',
    component: Home,
    exact: true,
    private: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    private: false,
  },
  // {
  //   path: '/register',
  //   component: Register,
  //   exact: true,
  //   private: false,
  // },
  {
    path: '/forgotPassword',
    component: ForgotPassword,
    exact: true,
    private: false,
  },
  {
    path: '/404',
    component: NotFound,
    exact: true,
    private: false,
  },
  {
    path: '/admin',
    component: Admin,
    exact: true,
    private: true,
  },
  {
    path: '/products/items',
    component: ItemsProducts,
    exact: true,
    private: true,
  },
  {
    path: '/classificados',
    component: Classificados,
    exact: true,
    private: true,
  },
  {
    path: '/favorites',
    component: Favorites,
    exact: true,
    private: true,
  },
]

export { default as PrivateRoute } from './private-route'
