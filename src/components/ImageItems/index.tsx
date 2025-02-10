import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import { useHistory } from 'react-router-dom'

import {
  ListItem,
  Flex,
  Image,
  Button,
  List,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from '@chakra-ui/react'

import { Like } from 'src/assets'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useAuth } from 'src/Context'
import { favoritesService, userService } from 'src/services'

import { BoxProduct } from '..'

type ImageItemsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  handleToggleFavorite?: () => void
}

const ImageItems = ({ items, handleToggleFavorite }: ImageItemsProps) => {
  const toast = useToast()
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuth()
  // const [tentativas, setTentativas] = useState(0)
  const goItemsProduct = (folderName: string, name: string) => {
    history.push('/products/items', { folderName, name })
  }

  const downloadItem = (url: string) => {
    userService
      .findOne(user?.user._id)
      .then(res => {
        if (res.data.type === 'free') {
          onOpen()
        } else {
          window.open(url)
        }
        // console.log(res.data)
        // if (res.data.type === undefined || res.data.type !== 'free') {
        //   window.open(url)
        // } else if (res.data.type === 'free' && res.data.tentativas < 2) {
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   const storedData: any = localStorage.getItem(`t3d-user`)
        //   const storageParsed = JSON.parse(storedData)
        //   apiNo
        //     .put(
        //       `/users/downloads/${user?.user._id}`,
        //       {
        //         tentativas: res.data.tentativas + 1,
        //       },
        //       {
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'authorization': `Bearer ${storageParsed.token}`,
        //         },
        //       }
        //     )
        //     .then(() => {
        //       window.open(url)
        //     })
        //     .catch((err: string) => {
        //       alert(err + '-' + 'Falha ao baixar item!')
        //     })
        // } else if (res.data.type === 'free' && res.data.tentativas === 2) {
        //   const date24before = new Date()
        //   const dateNow = date24before.getTime()
        //   const dateDownload = res.data.dataDownload
        //   date24before.setDate(date24before.getDate() - 1)
        //   if (dateDownload > date24before.getTime()) {
        //     onOpen()
        //   } else {
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     const storedDataUpt: any = localStorage.getItem(`t3d-user`)
        //     const storageParsedUpt = JSON.parse(storedDataUpt)
        //     apiNo
        //       .put(
        //         `/users/downloads/${user?.user._id}`,
        //         {
        //           tentativas: 0,
        //           dataDownload: dateNow,
        //         },
        //         {
        //           headers: {
        //             'Content-Type': 'application/json',
        //             'authorization': `Bearer ${storageParsedUpt.token}`,
        //           },
        //         }
        //       )
        //       .then(() => {
        //         window.open(url)
        //       })
        //       .catch((err: string) => {
        //         alert(err + '-' + 'Falha ao realizar download!')
        //       })
        //   }
        // }
      })
      .catch(err => {
        alert(err + 'Erro ao identificar usuário!')
      })
  }

  const handleAddToFavorite = (directoryOfImage: string) => {
    favoritesService
      .addFavorite(directoryOfImage)
      .then(res => {
        if (res.status === 201) {
          toast({
            title: res.data.message,
            status: 'success',
            isClosable: true,
            duration: 2000,
          })
        } else {
          handleToggleFavorite?.()
          toast({
            title: res.data.message,
            status: 'info',
            isClosable: true,
            duration: 2000,
          })
        }
      })
      .catch(error => {
        toast({
          title: error.message,
          status: 'error',
          isClosable: true,
          duration: 2000,
        })
      })
  }

  return (
    <>
      <List
        w='100%'
        pr={['0', '8']}
        display='flex'
        flexWrap='wrap'
        overflowX='hidden'
        overflowY='hidden'
      >
        {items[0]?.urlImage
          ? items?.map(product => (
              <ListItem
                mr={0}
                ml={1}
                mt={1}
                flexGrow={1}
                key={product.urlImage}
                maxW='15rem'
              >
                <Flex w='100%' maxW='15rem' h='100%' position='relative'>
                  <Flex
                    w='100%'
                    h='100%'
                    position='absolute'
                    opacity='0'
                    transition='0.3s'
                    _hover={{ opacity: '1' }}
                    zIndex={1}
                  >
                    <Flex
                      w='100%'
                      boxShadow='0px 0px 15px 5px rgba(0,0,0,0.6)'
                      bg='rgba(0,0,0,0.6)'
                      borderRadius='6'
                      justify='center'
                      align='center'
                    >
                      <Button
                        onClick={() => downloadItem(product.urlDownload)}
                        color='white'
                        border='1px solid white'
                        fontSize='12'
                        variant='outline'
                        mr='1'
                        _hover={{ bg: 'purple.500', borderColor: 'purple.500' }}
                      >
                        {/* <Icon w='5' as={DownloadIcon} /> */}
                        <AiOutlineDownload size='20' />
                      </Button>
                      <Button
                        color='white'
                        border='1px solid white'
                        fontSize='12'
                        bg='transparent'
                        _hover={{ bg: 'purple.500', borderColor: 'purple.500' }}
                        onClick={() => handleAddToFavorite(product.directory)}
                      >
                        <Image w='5' src={Like} />
                      </Button>
                    </Flex>
                  </Flex>
                  <LazyLoadImage
                    threshold={500}
                    effect='blur'
                    src={product.urlImage}
                    key={product.directory}
                    delayTime={0}
                    style={{
                      width: '15rem',
                      height: '15rem',
                      objectFit: 'contain',
                      display: 'flex',
                    }}
                  />
                </Flex>
              </ListItem>
            ))
          : items.map(folder => (
              <Flex marginLeft={1} key={folder} marginTop={1}>
                <BoxProduct
                  onClick={() => goItemsProduct(folder.prefix, folder.name)}
                  title={folder.name}
                  disable={false}
                  icon='MdFolder'
                />
              </Flex>
            ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Limite de Downloads</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Adquira o acesso premium para desbloquear todo nosso conteúdo.</Text>
            <Button
              colorScheme='purple'
              mr={3}
              onClick={() => window.open('https://total3d.com.br/#Planos')}
            >
              Desbloquear Agora
            </Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default trackWindowScroll(ImageItems)
