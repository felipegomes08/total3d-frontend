import React from 'react'

import { Spinner, SpinnerProps } from '@chakra-ui/react'

const SwitchComponent = (props: SpinnerProps) => {
  return <Spinner color='gray' size='lg' speed='0.8s' {...props} />
}
export default SwitchComponent
