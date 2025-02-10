import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  FlexProps,
  Spinner,
  Link,
  InputRightElement,
  InputGroup,
  Flex,
  Image,
  Text,
  Stack,
  useToast,
  PinInput,
  PinInputField,
  AlertStatus,
} from '@chakra-ui/react'

import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { motion } from 'framer-motion'
import { BtnLogin } from 'src/assets'
import { Input, Container } from 'src/components'
import { authService } from 'src/services'
import { regex } from 'src/utils'

const MotionFlex = motion<FlexProps>(Flex)

const ForgotPassword = () => {
  const toast = useToast()
  const { activeStep, nextStep } = useSteps({
    initialStep: 0,
  })
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isLoading, setIsLoading] = useState({
    email: false,
    verifyCode: false,
    updatePass: false,
  })

  const handleToast = (toastId: string, title: string, status: AlertStatus) => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title,
        status,
        isClosable: true,
      })
    }
  }

  const handleSendEmail = async () => {
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
    } else if (email) {
      setIsLoading(prevState => ({ ...prevState, email: true }))

      authService
        .sendEmail({ email: email })
        .then(() => {
          nextStep()
        })
        .catch(() => {
          handleToast('toast-sendEmail', 'Erro ao enviar email', 'error')
        })
        .finally(() => setIsLoading(prevState => ({ ...prevState, email: false })))
    } else {
      handleToast('toast-sendEmail-empty', 'Preencha o campo corretamente', 'warning')
    }
  }

  const handleVerifyCode = async (text: string) => {
    setCode(text)
    setIsLoading(prevState => ({ ...prevState, verifyCode: true }))

    if (email && text) {
      authService
        .verifyCode({ email: email, code: parseInt(text) })
        .then(() => {
          nextStep()
        })
        .catch(() => {
          handleToast('toast-verifyCode', 'Código inválido', 'error')
        })
        .finally(() => setIsLoading(prevState => ({ ...prevState, verifyCode: false })))
    } else {
      handleToast('toast-verifyCode-empty', 'Preencha o campo corretamente', 'warning')
    }
  }

  const handleUpdatedPass = async () => {
    if (newPassword.length < 8 && confirmPassword.length < 8) {
      handleToast(
        'toast-password-min-length',
        'A senha deve conter no mínimo 8 caracteres',
        'warning'
      )
    } else {
      if (newPassword === confirmPassword) {
        setIsLoading(prevState => ({ ...prevState, updatePass: true }))

        authService
          .updatedPass({
            email: email,
            code: parseInt(code),
            newPassword: confirmPassword,
          })
          .then(() => {
            handleToast('toast-updatedPass', 'Senha alterada com sucesso', 'success')

            history.push('/login')
          })
          .catch(() => {
            handleToast('toast-updatePass', 'Erro ao atualizar a senha', 'error')
          })
          .finally(() => setIsLoading(prevState => ({ ...prevState, updatePass: false })))
      } else {
        handleToast('toast-password-dont-match', 'As senhas não coincidem', 'warning')
      }
    }
  }

  return (
    <Container showLogo showPrivacy>
      <Flex w='100%' h='100%' align='center' justify='center'>
        <Flex w='80%' h='100%' align='center' justify='center' px={['5', '0']}>
          <MotionFlex
            initial={{ opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transitionDuration='0.7s'
            w='100%'
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
            <Flex w='100%' p={['4', '8', '12', '16']} flexDir='column'>
              <Stack spacing='16'>
                <Steps
                  cursor='pointer'
                  responsive
                  colorScheme='purple'
                  activeStep={activeStep}
                >
                  <Step key='Digite o Email'>
                    <Stack spacing='8'>
                      <Text color='gray' textAlign='center' fontSize='18'>
                        Digite seu email para receber o código de confirmação
                      </Text>
                      <Flex
                        display='flex'
                        flexDirection='column'
                        flex='1'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <InputGroup maxW={250}>
                          <Input
                            color='gray'
                            name='email'
                            type='email'
                            placeholder='Email'
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                          />
                          <InputRightElement
                            children={
                              <Link onClick={handleSendEmail}>
                                {isLoading.email ? (
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
                      </Flex>
                    </Stack>
                  </Step>
                  <Step key='Digite o Código'>
                    <Stack spacing='8'>
                      <Text color='gray' textAlign='center' fontSize='17'>
                        Digite o código de confirmação enviado no email
                      </Text>
                      <Flex
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='center'
                      >
                        {isLoading.verifyCode ? (
                          <Spinner
                            color='gray'
                            size='sm'
                            speed='0.8s'
                            marginTop={2}
                            marginRight={3}
                          />
                        ) : (
                          <PinInput onComplete={handleVerifyCode} otp>
                            <PinInputField color='white' />
                            <PinInputField marginLeft={1} color='white' />
                            <PinInputField marginLeft={1} color='white' />
                            <PinInputField marginLeft={1} color='white' />
                            <PinInputField marginLeft={1} color='white' />
                            <PinInputField marginLeft={1} color='white' />
                          </PinInput>
                        )}
                      </Flex>
                    </Stack>
                  </Step>
                  <Step key='Digite a nova senha'>
                    <Stack spacing='8'>
                      <Text color='gray' textAlign='center' fontSize='18'>
                        Digite e confirme sua nova senha
                      </Text>
                      <Flex
                        display='flex'
                        flexDirection='column'
                        flex='1'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Input
                          maxW={250}
                          name='newPassword'
                          type='password'
                          placeholder='Nova Senha'
                          borderBottomRadius='0'
                          borderBottom='none'
                          onChange={e => setNewPassword(e.target.value)}
                          value={newPassword}
                        />
                        <InputGroup maxW={250}>
                          <Input
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirmar Senha'
                            borderTopRadius='0'
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />
                          <InputRightElement
                            children={
                              <Link onClick={handleUpdatedPass}>
                                {isLoading.updatePass ? (
                                  <Spinner
                                    color='gray'
                                    size='sm'
                                    speed='0.8s'
                                    marginTop={2}
                                    marginRight={3}
                                  />
                                ) : (
                                  <Image src={BtnLogin} w='60%' />
                                )}
                              </Link>
                            }
                          />
                        </InputGroup>
                      </Flex>
                    </Stack>
                  </Step>
                </Steps>
              </Stack>
            </Flex>
          </MotionFlex>
        </Flex>
      </Flex>
    </Container>
  )
}
export default ForgotPassword
