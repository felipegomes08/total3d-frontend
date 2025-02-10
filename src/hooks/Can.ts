import { useMemo } from 'react'

import decode from 'jwt-decode'
import { JWTProps, UserPermissionsProps, SignInProps } from 'src/@types'
import { useLocalStorage } from 'src/hooks'
import { userService } from 'src/services'
import { validatedUserPermission } from 'src/utils/valitadeUserPermissions'

const useCan = async ({ screen }: UserPermissionsProps) => {
  const [userReq] = useLocalStorage<SignInProps>('user')

  if (!userReq) return false

  const decodeToken = decode<JWTProps>(userReq.token)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const verifyToken = await useMemo(
    () => userService.verify(decodeToken.user._id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screen]
  )

  if (!userReq.token) return false

  const { user, type } = decode<JWTProps>(verifyToken.data)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return validatedUserPermission({ user, type, screen })
}

export default useCan
