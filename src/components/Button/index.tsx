import React from 'react'

import { Button as Btn, ButtonProps } from '@chakra-ui/react'

const Button = (props: ButtonProps) => {
  return (
    <Btn
      focusBorderColor='purple.500'
      _hover={{ bg: '#830AD1', color: 'white', transition: '0.3s' }}
      fontSize='13'
      bgGradient='linear(340deg, white 2%, purple.900 100%)'
      {...props}
    >
      {props.children}
    </Btn>
  )
}
export default Button
