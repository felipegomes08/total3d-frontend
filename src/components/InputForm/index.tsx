import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

type InputFormProps = BoxProps & {
  label?: string
}

const InputForm = ({ label, ...rest }: InputFormProps) => {
  return (
    <Box border='1px solid gray' borderRadius='6' color='white' {...rest}>
      {label}
    </Box>
  )
}
export default InputForm
