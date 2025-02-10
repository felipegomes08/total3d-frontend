import React, { useState } from 'react'

import { Flex, Stack, FormControl, useToast, Input } from '@chakra-ui/react'

import { BoxContainer, Button, Container } from 'src/components'
import { useAuth } from 'src/Context/auth'
import { apiNo } from 'src/services/apiNo'
import { regex } from 'src/utils'

const Register = () => {
  const [nameCreate, setNameCreate] = useState('')
  const [emailCreate, setEmailCreate] = useState('')
  const [passwordCreate, setPasswordCreate] = useState('')
  const [confirmPasswordCreate, setConfirmPasswordCreate] = useState('')
  const [productsSelected] = useState<string[]>([
    '620d0362405c09339c5c05e1',
    '620d037d405c09339c5c05e6',
  ])

  const toast = useToast()
  const { signIn } = useAuth()

  const createUser = async () => {
    if (!regex.email.test(emailCreate)) {
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
    } else if (
      emailCreate &&
      nameCreate &&
      passwordCreate &&
      confirmPasswordCreate &&
      passwordCreate === confirmPasswordCreate
    ) {
      const date = new Date()
      apiNo
        .post('auth/register', {
          name: nameCreate,
          email: emailCreate,
          password: passwordCreate,
          products: productsSelected,
          type: 'free',
          tentativas: 0,
          dataDownload: date.getTime(),
        })
        .then(() => {
          const id = 'toast-user-created'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Usuário criado  com sucesso',
              status: 'success',
              isClosable: true,
            })
          }
          signIn(emailCreate, passwordCreate)
        })
        .catch(err => {
          console.log(err)
          const id = 'toast-create-user'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Erro ao criar usuário',
              status: 'error',
              isClosable: true,
            })
          }
        })
    } else {
      const id = 'toast-password-divergent'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'As senhas não coincidem',
          status: 'warning',
          isClosable: true,
        })
      }
    }
  }

  return (
    <Container showLogo showPrivacy>
      <Flex w='100%' h='100%' justify='center' align='center'>
        <Flex maxWidth='550px' maxHeight='450px'>
          <BoxContainer>
            <Flex as='form' w='100%' p={['4', '8', '12', '16']} flexDir='column'>
              <Stack spacing='6'>
                <Stack spacing='4'>
                  <FormControl>
                    <Input
                      name='name'
                      color='#fff'
                      type='text'
                      placeholder='Nome do Usuário'
                      onChange={e => setNameCreate(e.target.value)}
                      borderBottomRadius='0'
                      value={nameCreate}
                    />
                    <Input
                      name='Email'
                      color='#fff'
                      type='email'
                      placeholder='Email'
                      onChange={e => setEmailCreate(e.target.value)}
                      borderRadius='0'
                      value={emailCreate}
                    />
                    <Input
                      name='password'
                      color='#fff'
                      type='password'
                      placeholder='Senha'
                      borderRadius='0'
                      onChange={e => setPasswordCreate(e.target.value)}
                      value={passwordCreate}
                    />
                    <Input
                      name='confirm'
                      color='#fff'
                      type='password'
                      placeholder='Confirmar senha'
                      onChange={e => setConfirmPasswordCreate(e.target.value)}
                      borderTopRadius='0'
                      value={confirmPasswordCreate}
                    />
                  </FormControl>
                </Stack>

                <Button onClick={createUser}>CADASTRAR AGORA</Button>
              </Stack>
            </Flex>
          </BoxContainer>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Register
