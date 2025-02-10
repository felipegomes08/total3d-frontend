export type UserPermissionsProps = {
  screen: string
}

export type UserProps = {
  _id: string
  name: string
  enable: boolean
  password: string
  email: string
  su: boolean
  products: string[]
  permissions: UserPermissionsProps[]
}
