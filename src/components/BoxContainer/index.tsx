import React, { ReactNode } from 'react'

import { Flex } from '@chakra-ui/react'

export interface BoxContainerProps {
  children: ReactNode
}

const BoxContainer = ({ children }: BoxContainerProps) => {
  return (
    <Flex w='100%' bg='gray.800' borderRadius={10} flexDir='column'>
      <Flex
        w='100%'
        h='2'
        position='relative'
        top='0'
        borderTopRadius={15}
        bgGradient='linear(to-r, white, purple.900)'
      />
      {children}
    </Flex>
  )
}
export default BoxContainer
