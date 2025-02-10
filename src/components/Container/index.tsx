import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

import { Flex, Image, ChakraProvider, HStack, Link, Text } from '@chakra-ui/react'

import { LogoText } from 'src/assets'
import SideBar from 'src/components/SideBar'
import { theme } from 'src/themes'
import { i18n } from 'src/translate/i18n'

export interface ContainerProps {
  showLogo?: boolean
  showSidebar?: boolean
  showPrivacy?: boolean
  privacyResponsive?: boolean
  children?: ReactNode
  productName?: string
}

const Container = ({
  children,
  showLogo,
  showSidebar,
  showPrivacy,
  privacyResponsive,
  productName,
}: ContainerProps) => {
  const history = useHistory()

  return (
    <ChakraProvider theme={theme}>
      <Flex
        w='100%'
        h={[
          privacyResponsive ? '100%' : '100vh',
          privacyResponsive ? '100%' : '100vh',
          privacyResponsive ? '100%' : '100vh',
          history.location.pathname.includes('admin') ? '100%' : '100vh',
        ]}
      >
        <Flex h='100%' w='100%' flexDir='column'>
          <Flex
            display={showLogo ? 'flex' : 'none'}
            w='100%'
            h='24'
            align='center'
            justify='flex-start'
          >
            <Image w='200px' src={LogoText} alt='' ml={5} my='5' />
          </Flex>
          <Flex w='100%' h='100%'>
            {showSidebar && (
              <Flex w='100%' maxW='40' display={['none', showSidebar ? 'flex' : 'none']}>
                <SideBar productName={productName} />
              </Flex>
            )}
            <Flex h='100%' w='100%'>
              {children}
            </Flex>
          </Flex>
          <Flex
            h='12'
            display={showPrivacy ? 'flex' : 'none'}
            w='100%'
            justify='center'
            my={5}
            bottom='0'
          >
            <HStack spacing='1' position={['absolute', 'relative']} bottom='0'>
              <Link textAlign='center' color='gray' fontSize={12}>
                {i18n.t('policy.privacy')}
              </Link>
              <Text as='span' color='gray'>
                |
              </Text>
              <Link textAlign='center' color='gray' fontSize={12}>
                {i18n.t('policy.terms')}
              </Link>
              <Text as='span' color='gray'>
                |
              </Text>
              <Link textAlign='center' color='gray' fontSize={12}>
                {i18n.t('policy.copyrigth')}
              </Link>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default Container
