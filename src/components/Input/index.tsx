import React from 'react'

import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  placeholder?: string
}

const Input = ({ name, placeholder, ...rest }: InputProps) => {
  return (
    <ChakraInput
      name={name}
      id={name}
      focusBorderColor='purple.500'
      bg='gray.800'
      borderColor='gray'
      variant='outline'
      color='gray'
      fontSize={12}
      _hover={{
        bg: 'gray.800',
      }}
      placeholder={placeholder}
      {...rest}
    />
  )
}

export default Input
