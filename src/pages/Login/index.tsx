import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Flex,
  Stack,
  FormControl,
  Link,
  Image,
  InputRightElement,
  InputGroup,
  Spinner,
  FlexProps,
  useToast,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { Logo, BtnLogin } from 'src/assets'
import { Input, Container } from 'src/components'
import { useAuth } from 'src/Context/auth'
import { i18n } from 'src/translate/i18n'
import { regex } from 'src/utils'

const MotionFlex = motion<FlexProps>(Flex)

const Login = () => {
  const history = useHistory()
  const toast = useToast()
  const { signIn, errorAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  useEffect(() => {
    if (errorAuth) {
      const id = 'toast-login'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Erro ao validar suas credênciais.',
          status: 'error',
          isClosable: true,
        })
      }
      setIsLoadingLogin(false)
    }
  }, [errorAuth, toast])

  const handleLogin = () => {
    if (!regex.email.test(email)) {
      const id = 'toast-email-test'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Email inválido',
          status: 'warning',
          isClosable: true,
          duration: 1500,
        })
      }
    } else if (email && password) {
      setIsLoadingLogin(true)

      signIn(email, password)
    } else {
      const id = 'toast-login-empty'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Preencha todos os campos.',
          status: 'warning',
          isClosable: true,
          duration: 1500,
        })
      }
    }
  }

  return (
    <Container showLogo showPrivacy>
      <Flex w='100%' h='100%' justify='center' align='center'>
        <Flex w='100%'>
          <MotionFlex
            flexDir='column'
            initial={{ opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transitionDuration='0.7s'
            w='100%'
            alignItems='center'
            justifyContent='center'
            px='0'
          >
            <Flex
              w='100%'
              maxW={[320, 420]}
              bg='gray.800'
              borderRadius={10}
              flexDir='column'
            >
              <Flex
                w='100%'
                h='2'
                position='relative'
                top='0'
                borderTopRadius={15}
                bgGradient='linear(to-r, white, purple.900)'
              />
              <Flex as='form' w='100%' p={['4', '8', '12', '16']} flexDir='column'>
                <Stack spacing='16'>
                  <Stack spacing='4'>
                    <Image src={Logo} alt='Total3D' h='20' />
                    <FormControl>
                      <Input
                        name='Email'
                        type='email'
                        placeholder={i18n.t('placeholders.email')}
                        borderBottomRadius='0'
                        borderBottom='none'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                      />
                      <InputGroup>
                        <Input
                          name='password'
                          type='password'
                          placeholder={i18n.t('placeholders.password')}
                          borderTopRadius='0'
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                        />
                        <InputRightElement
                          children={
                            <Link onClick={handleLogin}>
                              {isLoadingLogin ? (
                                <Spinner
                                  color='gray'
                                  size='sm'
                                  speed='0.8s'
                                  marginTop={2}
                                  marginRight={3}
                                />
                              ) : (
                                <Image src={BtnLogin} alt='' w='60%' />
                              )}
                            </Link>
                          }
                        />
                      </InputGroup>
                    </FormControl>
                  </Stack>
                  <Flex flexDir='column'>
                    <Stack spacing='4'>
                      <Link
                        color='gray'
                        fontSize={12}
                        alignSelf='center'
                        onClick={() => {
                          history.push('/forgotPassword')
                        }}
                      >
                        {i18n.t('sessions.forgotPassword')}
                      </Link>
                    </Stack>
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
          </MotionFlex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Login
