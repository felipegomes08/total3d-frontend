import React from 'react'

import { Switch, FormLabel, FormControl, SwitchProps } from '@chakra-ui/react'

type ProductsSwitchProps = SwitchProps & {
  label: string
  id: string
}

const SwitchComponent = ({ label, ...restProps }: ProductsSwitchProps) => {
  return (
    <FormControl display='flex' alignItems='center' justifyContent='space-between'>
      <FormLabel color='white' htmlFor={label} mb='0'>
        {label}
      </FormLabel>
      <Switch colorScheme='purple' {...restProps} />
    </FormControl>
  )
}
export default SwitchComponent
