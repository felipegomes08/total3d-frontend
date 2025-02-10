import { UserProps } from './'

export type SignInProps = {
  user: UserProps
  token: string
  refreshToken: string
}

export type JWTProps = {
  user: UserProps
  ia: number
  exp: number
  type: string
}
