type validatedUserPermissionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  screen: any
  type: string
}

export function validatedUserPermission({
  user,
  screen,
  type,
}: validatedUserPermissionProps): boolean {
  if (type !== 'verify') {
    return false
  }
  const hasPermission: boolean = user.permissions.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (permission: any) => permission.screen === screen
  )

  return hasPermission
}
