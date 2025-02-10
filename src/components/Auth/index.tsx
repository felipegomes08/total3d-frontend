import React from 'react'

import { Flex } from '@chakra-ui/react'

import { Spinner } from 'src/components'

type AuthProps = {
  loading: string
  isAuthenticated: boolean | null
}

const Auth = ({ loading, isAuthenticated }: AuthProps) => {
  if (loading === 'loading' && isAuthenticated == null) {
    return (
      <Flex w='100%' h='100vh' align='center' justify='center'>
        <Spinner />
      </Flex>
    )
  } else if (loading === 'loading') {
    return (
      <Flex w='100%' h='100vh' align='center' justify='center'>
        <Spinner />
      </Flex>
    )
  }

  return <></>
}

export default Auth
