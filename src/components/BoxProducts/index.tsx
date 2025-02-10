import React from 'react'
import { AiFillLock } from 'react-icons/ai'
import * as Icons from 'react-icons/md'

import { Box, Stack, Text, Flex, Link } from '@chakra-ui/react'

export interface BoxProductProps {
  title: string
  label?: string
  disable?: boolean
  onClick(): void
  icon: string
  disableLineBottom?: boolean
}

const BoxProduct = ({
  title,
  label,
  disable,
  onClick,
  icon,
  disableLineBottom,
}: BoxProductProps) => {
  const generateIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Iconn = Icons[iconName] || 'MdTurnedIn'

    return <Iconn color='#c7c7c7' size={28} />
  }

  return disable ? (
    <Link
      position='relative'
      bg='gray.800'
      w='100%'
      maxW='220px'
      maxH='310px'
      opacity={0.3}
      borderRadius={6}
      color='white'
      fontSize='12'
      transition='0.5s'
      cursor='unset'
      _hover={{
        zIndex: '999',
        transform: 'scale(1.03)',
      }}
    >
      <Box pt='24' pb='10' w='220px'>
        <Stack align='center' spacing={14}>
          <Flex h='70px' w='70px' justify='center' align='center'>
            {/* <Icon as={LockIcon} fontSize='80' /> */}
            <AiFillLock size='sm' />
          </Flex>
          <Stack align='center' spacing={1}>
            <Text textAlign='center' fontSize='14' fontWeight='bold'>
              {title}
            </Text>
            <Text textAlign='center' color='gray'>
              {label}
            </Text>
          </Stack>
        </Stack>
      </Box>
      <Flex
        w='100%'
        h='1.5'
        position='absolute'
        bottom='0'
        borderBottomRadius={6}
        bgGradient='linear(to-r, white, purple.900)'
      />
    </Link>
  ) : (
    <Link
      onClick={onClick}
      position='relative'
      bg='gray.800'
      w='100%'
      maxW='220px'
      maxH='310px'
      borderRadius={6}
      color='white'
      fontSize='12'
      transition='0.5s'
      _hover={{
        zIndex: '999',
        bg: 'white',
        color: 'black',
        transform: 'scale(1.1)',
      }}
    >
      <Box pt='24' pb='10' w='220px'>
        <Stack align='center' spacing={14}>
          <Flex
            h='70px'
            w='70px'
            border='1px solid gray'
            borderRadius={4}
            justify='center'
            align='center'
          >
            {generateIcon(icon || 'MdTurnedIn')}
            {/* {image} */}
          </Flex>
          <Stack align='center' spacing={1}>
            <Text textAlign='center' fontSize='14' fontWeight='bold'>
              {title}
            </Text>
            <Text textAlign='center' color='gray'>
              {label}
            </Text>
          </Stack>
        </Stack>
      </Box>
      {disableLineBottom && (
        <Flex
          w='100%'
          h='1.5'
          position='absolute'
          bottom='0'
          borderBottomRadius={6}
          bgGradient='linear(to-r, white, purple.900)'
        />
      )}
    </Link>
  )
}
export default BoxProduct
