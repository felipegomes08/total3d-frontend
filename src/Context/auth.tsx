import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { SignInProps } from 'src/@types'
import { useLocalStorage } from 'src/hooks'
import { authService } from 'src/services'
import { logger } from 'src/utils'

type AuthContextProps = {
  signed: boolean
  user: SignInProps | null
  isLoadedStoredData: boolean
  // setIsLoadedStoredData: React.Dispatch<React.SetStateAction<boolean>>
  isLoadingAuth: boolean
  errorAuth: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signIn(email: string, password: string): Promise<any>
  signOut(): void
  revalidate(data: SignInProps): void
}

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory()

  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [isLoadedStoredData, setIsLoadedStoredData] = useState(false)
  const [user, setUser] = useState<SignInProps | null>(null)
  const [errorAuth, setErrorAuth] = useState<string | null>(null)
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage<SignInProps | null>(
    'user'
  )

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedData = userLocalStorage

        setUser(storedData)

        setIsLoadedStoredData(true)
      } catch (error) {
        setIsLoadedStoredData(false)
      }
    }
    loadStorageData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function revalidate(data: SignInProps) {
    setUserLocalStorage(data)
    setUser(data)
  }

  function signIn(email: string, password: string) {
    setIsLoadingAuth(true)
    setErrorAuth(null)
    return authService
      .signIn(email, password)
      .then(({ data }) => {
        if (data?.user.enable) {
          setUserLocalStorage(data)

          setUser(data)
          history.push('/')
        } else {
          setErrorAuth('Ocorreu um erro ao entrar')
        }
      })
      .catch(error => {
        logger.info({ errorLogin: error })
        setErrorAuth('Ocorreu um erro ao entrar')
      })
      .finally(() => {
        setIsLoadingAuth(false)
      })
  }

  function signOut() {
    setUserLocalStorage(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user: user,
        isLoadedStoredData,
        isLoadingAuth,
        errorAuth,
        signIn,
        signOut,
        revalidate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
