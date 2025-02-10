import { extendTheme } from '@chakra-ui/react'

import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

export const theme = extendTheme({
  colors: {
    gray: {
      '800': '#1a1a1a',
      '400': '#333333',
      '50': '#808080',
    },
    purple: {
      '900': '#830AD1',
      '500': '#9731d8',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'black',
      },
    },
  },
  components: {
    Steps,
  },
})
