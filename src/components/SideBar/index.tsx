import React, { useState, useEffect } from 'react'
import { AiOutlineLeftCircle } from 'react-icons/ai'
import * as Icons from 'react-icons/md'
import { useHistory } from 'react-router-dom'

import {
  Avatar,
  Button,
  Stack,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react'

import { Like } from 'src/assets'
import { productService, userService } from 'src/services'

import { BoxContainer, Input } from '..'

import { getLocalStorage, logger, signOut } from 'src/utils'

export type SidebarProps = {
  productName?: string
}

const SideBar = ({ productName }: SidebarProps) => {
  const history = useHistory()
  const modalEditUser = useDisclosure()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    async function loadProducts() {
      const res = await productService.findAll().catch(error => {
        logger.info({ errorLoadSideBar: error })
      })
      if (res != null) {
        const productsActivity = res?.data?.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (product: any) => product.disabled === false
        )
        setProducts(productsActivity)
      }
    }

    const getUser = async () => {
      const userLocal = getLocalStorage('user')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await userService.findOne(userLocal.user._id).catch(error => {
        logger.info({ errorGetUser: error })
      })

      setUser(res?.data)
    }

    loadProducts()
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenFavoritesPage = () => {
    history.push('/favorites')
  }

  const handleEditUser = (key: string, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser((prevState: any) => ({ ...prevState, [key]: value }))
  }

  const handleSignOut = () => {
    signOut()
    history.push('/login')
  }

  const backPage = () => {
    history.goBack()
  }

  return (
    <Flex
      display={['none', 'flex']}
      position='fixed'
      maxW='40'
      w='100%'
      h='100%'
      direction='column'
      justify='space-between'
    >
      <Flex w='100%' h='100%' align='center' justify='space-evenly' flexDir='column'>
        <Flex w='100%' justify='center' align='center'>
          <Button
            onClick={backPage}
            bg='black'
            borderRadius='full'
            p='0'
            mr='5px'
            _hover={{
              bg: 'black',
            }}
          >
            {/* <ChevronLeftIcon size='40px' color='#c2c2c2' /> */}
            <AiOutlineLeftCircle size='40px' />
          </Button>
        </Flex>
        <Flex w='50%' h='auto' bg='gray.800' borderRadius='full' justify='center'>
          <Stack w='100%' direction='column' spacing='4' align='center' py='10'>
            <Flex w='100%' h={10} justify='center' align='center' position='relative'>
              {history.location.pathname.includes('/favorites') && (
                <Flex
                  borderRadius='100px 0 0 100px'
                  position='absolute'
                  w='5px'
                  h='2.5'
                  bgGradient='linear(340deg, white 2%, purple.900 100%)'
                  right='0'
                />
              )}
              <Flex
                border='2px solid gray'
                borderRadius='12'
                w='50%'
                h='100%'
                justify='center'
                align='center'
                cursor='pointer'
                transition='0.5s'
                _hover={{
                  bg: 'white',
                  transform: 'scale(1.2)',
                }}
                _active={{ bg: 'white', transform: 'scale(1.2)' }}
                onClick={handleOpenFavoritesPage}
              >
                <Image src={Like} w='50%' />
              </Flex>
            </Flex>
            {products?.map((item, index) => (
              <Flex
                key={index}
                w='100%'
                h={10}
                justify='center'
                align='center'
                position='relative'
              >
                {item.name === productName && (
                  <Flex
                    borderRadius='100px 0 0 100px'
                    position='absolute'
                    w='5px'
                    h='2.5'
                    bgGradient='linear(340deg, white 2%, purple.900 100%)'
                    right='0'
                  />
                )}
                <Flex
                  border='2px solid gray'
                  borderRadius='12'
                  w='50%'
                  h='100%'
                  justify='center'
                  align='center'
                  cursor='pointer'
                  transition='0.5s'
                  _hover={{
                    transform: 'scale(1.2)',
                  }}
                  onClick={() => {
                    history.push('/products/items', {
                      folderName: item.folderName,
                      name: item.name,
                    })
                  }}
                >
                  <Image src={item.urlIcon} w='50%' />
                </Flex>
              </Flex>
            ))}
            <Flex w='100%' h={10} justify='center' align='center' position='relative'>
              <Flex
                border='2px solid gray'
                borderRadius='12'
                w='50%'
                h='100%'
                justify='center'
                align='center'
                cursor='pointer'
                transition='0.5s'
                _hover={{
                  bg: 'white',
                  transform: 'scale(1.2)',
                }}
                _active={{ bg: 'white', transform: 'scale(1.2)' }}
                onClick={() => modalEditUser.onOpen()}
              >
                <Avatar bg='black' size='xs' />
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Flex>

      <Flex w='100%' h={10} justify='center' align='center' position='relative'>
        <Flex
          borderRadius='12'
          w='50%'
          h='100%'
          justify='center'
          align='center'
          cursor='pointer'
          onClick={handleSignOut}
          mb={10}
        >
          <Icons.MdExitToApp color='#fff' size={28} />
        </Flex>
      </Flex>

      <Modal
        colorScheme='black'
        isOpen={modalEditUser.isOpen}
        onClose={modalEditUser.onClose}
      >
        <ModalOverlay />
        <ModalContent bg='transparent'>
          <BoxContainer>
            <ModalHeader color='gray'>Seus Dados</ModalHeader>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel color='gray'>Nome</FormLabel>
                <Input
                  onChange={e => handleEditUser('name', e.target.value)}
                  value={user.name}
                  color='gray'
                  name='nome'
                  placeholder='Nome'
                  isDisabled
                />
              </FormControl>
              <FormControl my={4}>
                <FormLabel color='gray'>Email</FormLabel>
                <Input
                  onChange={e => handleEditUser('email', e.target.value)}
                  value={user.email}
                  color='gray'
                  name='email'
                  placeholder='e-mail'
                  isDisabled
                />
              </FormControl>
            </ModalBody>

            {/* <ModalFooter>
              <Btn onClick={() => editUser()}>Salvar</Btn>
              <Button ml='3' onClick={modalEditUser.onClose}>
                Cancelar
              </Button>
            </ModalFooter> */}
          </BoxContainer>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
export default SideBar
