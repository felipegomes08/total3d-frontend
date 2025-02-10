/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react'
import {
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
  AiFillLock,
  AiFillUnlock,
  AiFillDelete,
} from 'react-icons/ai'

import {
  Box,
  Flex,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  Stack,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Select,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from '@chakra-ui/react'

import { debounce } from 'lodash'
import { BoxContainer, Container, Switch, Spinner, Button as Btn } from 'src/components'
import { userService, productService } from 'src/services'
import { regex } from 'src/utils'

const Users = () => {
  const modalCreateUser = useDisclosure()
  const modalSyncProduct = useDisclosure()
  const modalEditUser = useDisclosure()
  const toast = useToast()

  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [nameCreate, setNameCreate] = useState('')
  const [emailCreate, setEmailCreate] = useState('')
  const [passwordCreate, setPasswordCreate] = useState('')
  const [confirmPasswordCreate, setConfirmPasswordCreate] = useState('')
  const [type, setType] = useState('')
  const [whatsApp, setWhatsApp] = useState('')

  const [nameOfProduct, setNameOfProduct] = useState('')
  const [descriptionOfProduct, setDescriptionOfProduct] = useState('')
  const [folderNameOfProduct, setFolderNameOfProduct] = useState('')

  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [productsSelected, setProductsSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [nameIconOfProduct, setNameIconOfProduct] = useState('')
  const [nameEdit, setNameEdit] = useState('')
  const [emailEdit, setEmailEdit] = useState('')
  const [typeEdit, setTypeEdit] = useState('')
  const [allProductsEdit, setAllProductsEdit] = useState<any[]>([])
  const [productsSelectedEdit, setProductsSelectedEdit] = useState<[{ _id: string }]>(
    [] as any
  )
  const selectedUserId = useRef('')

  async function loadData() {
    setIsLoadingUsers(true)
    setIsLoadingProducts(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const usersListed: any = await userService.findAll(`page=${page}&limit=15`)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productsListed: any = await productService.findAll()

    setProducts(productsListed.data)
    setUsers(usersListed.data)
    setIsLoadingUsers(false)
    setIsLoadingProducts(false)
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const onProductsSelectedEdit = (e: any, productId: string) => {
    setProductsSelectedEdit(prevState => ({
      ...prevState,
      [productId]: e.target.checked,
    }))
  }

  const getProductsOfUser = async (userId: string) => {
    setIsLoadingProducts(true)

    await productService
      .findAll(userId)
      .then(res => {
        for (const iterator of res.data) {
          onProductsSelectedEdit(
            { target: { checked: !iterator.disabled } },
            iterator._id
          )
        }

        setAllProductsEdit(res.data)
      })
      .catch(() => {
        const id = 'toast-get-products-admin'

        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Erro ao buscar produtos',
            status: 'error',
            isClosable: true,
          })
        }
      })
      .finally(() => {
        setIsLoadingProducts(false)
      })
  }

  const createUser = () => {
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
      passwordCreate === confirmPasswordCreate &&
      type
    ) {
      setIsLoadingUsers(true)
      const dateNow = new Date()
      userService
        .create({
          name: nameCreate,
          email: emailCreate,
          password: passwordCreate,
          products: productsSelected,
          type,
          tentativas: 0,
          dataDownload: dateNow.getTime(),
          celular: whatsApp,
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
        })
        .catch(() => {
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
        .finally(() => setIsLoadingUsers(false))
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
      setIsLoadingUsers(false)
    }
  }

  const editUser = (id = selectedUserId.current) => {
    setIsLoadingUsers(true)
    if (nameEdit && emailEdit && typeEdit) {
      userService
        .update(id, {
          name: nameEdit,
          email: emailEdit,
          type: typeEdit,
          products: Object.entries(productsSelectedEdit)
            .map((product: any) => {
              if (product[1]) {
                return product[0]
              } else {
                return null
              }
            })
            .filter(product => product !== null),
        })
        .then(() => {
          const id = 'block-user-toast-success'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Editado com sucesso',
              status: 'success',
              isClosable: true,
            })
          }
          modalEditUser.onClose()
          loadData()
        })
        .catch(() => {
          const id = 'update-user-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Ocorreu um erro.',
              status: 'error',
              isClosable: true,
            })
          }
        })
        .finally(() => setIsLoadingUsers(false))
    } else {
      const id = 'not-found-user-toast'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Insira o nome e email para atualizar',
          status: 'error',
          isClosable: true,
        })
      }
      setIsLoadingUsers(false)
    }
  }

  const deleteUser = (id: string) => {
    userService
      .deleteUser(id)
      .then(() => {
        const id = 'block-user-toast-success'

        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Excluído com sucesso',
            status: 'success',
            isClosable: true,
          })
        }
        modalEditUser.onClose()
        loadData()
      })
      .catch(() => {
        const id = 'update-user-toast'
        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Ocorreu um erro.',
            status: 'error',
            isClosable: true,
          })
        }
      })
      .finally(() => setIsLoadingUsers(false))
  }

  const blockUser = (id: string, enable: boolean) => {
    if (id) {
      userService
        .block(id, { enable })
        .then(() => {
          const id = 'block-user-toast-success'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Bloqueado com sucesso',
              status: 'success',
              isClosable: true,
            })
          }
          loadData()
        })
        .catch(() => {
          const id = 'block-user-toast'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Ocorreu um erro.',
              status: 'error',
              isClosable: true,
            })
          }
        })
    } else {
      const id = 'not-found-userId-toast'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Usuario não identificado',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  const onProductsSelected = (e: any, productId: string) => {
    if (e.target.checked) {
      setProductsSelected(prevState => [...prevState, productId])
    } else {
      setProductsSelected(prevState => prevState.filter(item => item !== productId))
    }
  }

  const searchFilter = debounce(async (text: string) => {
    setIsLoadingSearch(true)
    const result = await userService.findAll(text ? `text=${text}` : '')
    console.log('abacate')
    console.log(result.data)
    setUsers(result.data)
    setIsLoadingSearch(false)
  }, 600)

  const handleSyncProduct = () => {
    if (!nameOfProduct || !descriptionOfProduct || !folderNameOfProduct) {
      const id = 'toast-product-alert'

      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Preencha todos os campos',
          status: 'warning',
          isClosable: true,
        })
      }
    } else {
      productService
        .createOne({
          name: nameOfProduct,
          description: descriptionOfProduct,
          folderName: folderNameOfProduct,
          urlIcon: nameIconOfProduct,
        })
        .then(() => {
          const id = 'toast-product-created'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Produto criado com sucesso',
              status: 'success',
              isClosable: true,
            })
          }
        })
        .catch(() => {
          const id = 'toast-product-error'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Erro ao criar produto',
              status: 'error',
              isClosable: true,
            })
          }
        })
    }
  }

  return (
    <Container showLogo>
      <Flex w='100%' h='100%' mt='16' px='5'>
        <Box borderRadius={8} w='100%' bg='black'>
          <Flex
            direction={['column', 'column', 'row']}
            justify='space-between'
            align='center'
            my={[0, 3]}
          >
            <Stack direction='row' justify='center' align='center'>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                bg='rgb(128,128,128)'
                opacity='0.7'
                color='white'
                // leftIcon={<Icon as={AddIcon} />}
                leftIcon={<AiOutlinePlus />}
                mr={[0, 2, 6]}
                my={[3, 3, 0]}
                onClick={modalCreateUser.onOpen}
              >
                Cadastrar
              </Button>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                bg='rgb(128,128,128)'
                opacity='0.7'
                color='white'
                // leftIcon={<Icon as={AddIcon} />}
                leftIcon={<AiOutlinePlus />}
                mr={[0, 2, 6]}
                my={[3, 3, 0]}
                onClick={modalSyncProduct.onOpen}
              >
                Vincular produto
              </Button>
            </Stack>
            <Stack direction='row' justify='center' align='center'>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                bg='rgb(128,128,128)'
                opacity='0.7'
                color='white'
                // leftIcon={<Icon as={ChevronLeftIcon} />}
                leftIcon={<AiOutlineLeftCircle />}
                mr={[0, 0, 6]}
                my={[3, 3, 0]}
                onClick={() => setPage(prevState => prevState - 1)}
              >
                Anterior
              </Button>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                bg='rgb(128,128,128)'
                opacity='0.7'
                color='white'
                // rightIcon={<Icon as={ChevronRightIcon} />}
                rightIcon={<AiOutlineRightCircle />}
                mr={[0, 6]}
                my={[3, 3, 0]}
                onClick={() => setPage(prevState => prevState + 1)}
              >
                Próximo
              </Button>
            </Stack>
            <InputGroup w='267px'>
              <Input
                placeholder='Pesquisar...'
                onChange={e => searchFilter(e.target.value)}
                size='sm'
                borderRadius={8}
                variant='outline'
                color='#fff'
              />
              <InputRightElement
                height='100%'
                children={isLoadingSearch ? <Spinner size='sm' /> : <AiOutlineSearch />}
              />
            </InputGroup>
          </Flex>
          {isLoadingUsers ? (
            <Flex w='100%' h='100%' justify='center' align='center'>
              <Spinner />
            </Flex>
          ) : (
            <Table variant='striped' colorScheme='whiteAlpha' marginBottom={10}>
              <Thead>
                <Tr>
                  <Th>Nome do cliente</Th>
                  {isWideVersion && <Th>WhatsApp</Th>}
                  {isWideVersion && <Th>E-mail</Th>}
                  <Th width={['0', '8']}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user, index) => (
                  <Tr key={index}>
                    <Td>
                      <Box>
                        <Text fontWeight='bold' color='gray'>
                          {user.name}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td color='gray'>{user.celular}</Td>}
                    {isWideVersion && <Td color='gray'>{user.email}</Td>}
                    <Td>
                      <Stack direction={['column', 'row']}>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              as='a'
                              size='sm'
                              fontSize='sm'
                              bg='rgba(128,128,128, 0.3)'
                              color='white'
                              leftIcon={<AiFillDelete />}
                            >
                              Deletar
                            </Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverHeader>Confirma a exclusão?</PopoverHeader>
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Button
                                  colorScheme='purple'
                                  onClick={() => {
                                    deleteUser(user._id)
                                  }}
                                >
                                  Confirmar
                                </Button>
                              </PopoverBody>
                            </PopoverContent>
                          </Portal>
                        </Popover>

                        <Button
                          as='a'
                          size='sm'
                          fontSize='sm'
                          bg='rgba(128,128,128, 0.3)'
                          color='white'
                          // leftIcon={<Icon as={EditIcon} />}
                          leftIcon={<AiOutlineEdit />}
                          onClick={() => {
                            getProductsOfUser(user._id)
                            setNameEdit(user.name)
                            setEmailEdit(user.email)
                            setTypeEdit(user.type)
                            selectedUserId.current = user._id
                            modalEditUser.onOpen()
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          as='a'
                          size='sm'
                          fontSize='sm'
                          bg='rgba(128,128,128, 0.3)'
                          color='white'
                          leftIcon={
                            user.enable ? (
                              // <Icon as={LockIcon} />
                              <AiFillLock />
                            ) : (
                              // <Icon as={UnlockIcon} />
                              <AiFillUnlock />
                            )
                          }
                          onClick={() => {
                            blockUser(user._id, !user.enable)
                          }}
                        >
                          {!user.enable ? 'Ativar' : 'Desativar'}
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
        <Modal
          colorScheme='black'
          isOpen={modalEditUser.isOpen}
          onClose={modalEditUser.onClose}
        >
          <ModalOverlay />
          <ModalContent bg='transparent'>
            <BoxContainer>
              <ModalHeader color='gray'>Editar cliente</ModalHeader>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel color='gray'>Nome</FormLabel>
                  <Input
                    onChange={e => setNameEdit(e.target.value)}
                    color='#fff'
                    name='nome'
                    placeholder='Nome'
                    value={nameEdit}
                  />
                </FormControl>
                <FormControl my={4}>
                  <FormLabel color='gray'>Email</FormLabel>
                  <Input
                    onChange={e => setEmailEdit(e.target.value)}
                    color='#fff'
                    name='email'
                    placeholder='e-mail'
                    value={emailEdit}
                  />
                </FormControl>
                <FormControl my={4}>
                  <Select
                    onChange={e => setTypeEdit(e.target.value)}
                    placeholder='Selecione o plano do cliente'
                    value={typeEdit}
                  >
                    <option value='free'>Grátis</option>
                    <option value='individual'>Individual</option>
                    <option value='empresarial'>Empresarial</option>
                  </Select>
                </FormControl>
                {isLoadingProducts ? (
                  <Flex justify='center' align='center' h='100%'>
                    <Spinner />
                  </Flex>
                ) : (
                  <Box
                    overflowY='auto'
                    maxH={300}
                    marginTop={8}
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#9731d8',
                        borderRadius: '24px',
                      },
                    }}
                  >
                    <Stack direction='column' spacing='5' paddingRight='2'>
                      {allProductsEdit?.map(item => {
                        return (
                          <Switch
                            onChange={e => onProductsSelectedEdit(e, item._id)}
                            key={item._id}
                            id={item._id}
                            label={item.name}
                            isChecked={!!productsSelectedEdit[item._id]}
                          />
                        )
                      })}
                    </Stack>
                  </Box>
                )}
              </ModalBody>

              <ModalFooter>
                <Btn onClick={() => editUser()}>Salvar</Btn>
                <Button ml='3' onClick={modalEditUser.onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </BoxContainer>
          </ModalContent>
        </Modal>
        <Modal
          colorScheme='black'
          isOpen={modalCreateUser.isOpen}
          onClose={modalCreateUser.onClose}
        >
          <ModalOverlay />
          <ModalContent bg='transparent'>
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
                        borderRadius='0'
                        value={confirmPasswordCreate}
                      />
                      <Input
                        name='whats'
                        color='#fff'
                        type='text'
                        placeholder='WhatsApp'
                        onChange={e => setWhatsApp(e.target.value)}
                        borderRadius='0'
                        value={whatsApp}
                      />
                      <Select
                        borderTopRadius='0'
                        onChange={e => setType(e.target.value)}
                        placeholder='Selecione o plano do cliente'
                      >
                        <option value='free'>Grátis</option>
                        <option value='individual'>Individual</option>
                        <option value='empresarial'>Empresarial</option>
                      </Select>
                    </FormControl>
                  </Stack>
                  {isLoadingProducts ? (
                    <Flex justify='center' align='center' h='100%'>
                      <Spinner />
                    </Flex>
                  ) : (
                    <Box
                      overflowY='auto'
                      maxH={300}
                      css={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: '#9731d8',
                          borderRadius: '24px',
                        },
                      }}
                    >
                      <Stack direction='column' spacing='5' paddingRight='2'>
                        {products?.map(item => (
                          <Switch
                            onChange={e => onProductsSelected(e, item._id)}
                            key={item._id}
                            id={item._id}
                            label={item.name}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                  <Btn onClick={createUser}>CADASTRAR AGORA</Btn>
                </Stack>
              </Flex>
            </BoxContainer>
          </ModalContent>
        </Modal>
        <Modal
          colorScheme='black'
          isOpen={modalSyncProduct.isOpen}
          onClose={modalSyncProduct.onClose}
        >
          <ModalOverlay />
          <ModalContent bg='transparent'>
            <BoxContainer>
              <Flex as='form' w='100%' p={['4', '8', '12', '16']} flexDir='column'>
                <Stack spacing='6'>
                  <Stack spacing='4'>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Nome do Produto'
                        color='#fff'
                        onChange={e => setNameOfProduct(e.target.value)}
                        borderBottomRadius='0'
                      />
                      <Input
                        color='#fff'
                        placeholder='Descrição do Produto'
                        onChange={e => setDescriptionOfProduct(e.target.value)}
                        borderRadius='0'
                      />
                      <Input
                        placeholder='Nome da Pasta'
                        color='#fff'
                        borderRadius='0'
                        onChange={e => setFolderNameOfProduct(e.target.value)}
                      />
                      <Input
                        placeholder='URL do ícone'
                        color='#fff'
                        borderRadius='0'
                        onChange={e => setNameIconOfProduct(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Btn onClick={handleSyncProduct}>VINCULAR AGORA</Btn>
                </Stack>
              </Flex>
            </BoxContainer>
          </ModalContent>
        </Modal>
      </Flex>
    </Container>
  )
}
export default Users
