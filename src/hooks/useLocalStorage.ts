import { useState } from 'react'

import { logger } from 'src/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLocalStorage<T = any>(key: string, initialValue = '') {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(`t3d-${key}`)

      const value = item ? JSON.parse(item) : initialValue
      return value
    } catch (error) {
      logger.info({ errorUseAsyncStorage: error })
      return initialValue
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setStoredValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value

      setState(valueToStore)

      localStorage.setItem(`t3d-${key}`, JSON.stringify(valueToStore))
    } catch (error) {
      logger.info({ errorSetStoredValue: error })
    }
  }

  return [state, setStoredValue] as const
}
