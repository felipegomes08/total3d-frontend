import React from 'react'

import { Flex, Text } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex as='header' w='100%' maxW={1400} h='20' mx='auto' mt='4' px='6' align='center'>
      <Text fontSize='3xl'>Total3D</Text>
    </Flex>
  )
}

export default Header
