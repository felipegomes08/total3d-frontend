import React, { useState, useEffect } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import * as Icons from 'react-icons/md'
import { useHistory } from 'react-router-dom'

import {
  Stack,
  Flex,
  Link,
  useToast,
  Button,
  useDisclosure,
  Text,
  FlexProps,
  HStack,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { Container, BoxProduct, Spinner } from 'src/components'
import { productService } from 'src/services'
import { i18n } from 'src/translate/i18n'
import { signOut } from 'src/utils'

const randomPhrases = [
  i18n.t('phrases.phraseOne'),
  i18n.t('phrases.phraseTwo'),
  i18n.t('phrases.phraseTree'),
]

const MotionFlex = motion<FlexProps>(Flex)
const Home = () => {
  const { onOpen } = useDisclosure()
  const toast = useToast()
  const history = useHistory()

  const [phrase, setPhrase] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)]
    setPhrase(randomPhrase)
    setIsLoading(true)

    async function loadProducts() {
      await productService
        .findAll()
        .then(res => {
          setProducts(res.data)
        })
        .catch(() => {
          const id = 'prducts-toast'

          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Erro ao carregar produtos.',
              status: 'error',
              isClosable: true,
            })
          }
        })
        .finally(() => {
          setIsLoading(false)
          onOpen()
        })
    }

    setTimeout(() => {
      loadProducts()
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goItemsProduct = (folderName: string, name: string) => {
    history.push('/products/items', { folderName, name })
  }

  const handleSignOut = () => {
    signOut()
    history.push('/login')
  }

  return (
    <Container showLogo showPrivacy privacyResponsive>
      <Button
        variant='ghost'
        colorScheme='teal'
        onClick={onOpen}
        position='absolute'
        top='2'
        right='2'
        display={['flex', 'none']}
      >
        {/* <Icon color='white' fontSize='20' as={HamburgerIcon} /> */}
        <AiOutlineBars />
      </Button>
      <Flex
        w='100%'
        h='100%'
        justify='center'
        align='center'
        flexDirection='column'
        flex='1'
      >
        {isLoading ? (
          <MotionFlex
            flexDir='column'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transitionDuration='0.7s'
            flex='1'
            justifyContent='center'
          >
            <Stack spacing='5' justify='center' align='center'>
              <Flex />
              <Spinner />
              <Text color='#fff' fontWeight='medium' textAlign='center'>
                {phrase}
              </Text>
            </Stack>
          </MotionFlex>
        ) : (
          <Flex w='100%' h='100%' justify='center'>
            <HStack
              position='relative'
              h='auto'
              flexWrap='wrap'
              direction='row'
              align='center'
              justify='center'
              spacing={['0', '1']}
            >
              {products?.map((item, index) => {
                return (
                  <BoxProduct
                    onClick={() => goItemsProduct(item.folderName, item.name)}
                    key={`index-${index}`}
                    title={item.name}
                    label={item.description}
                    disable={item.disabled}
                    icon={item.nameIcon}
                  />
                )
              })}
            </HStack>
          </Flex>
        )}

        <Flex
          w='100%'
          paddingRight='115'
          paddingLeft='115'
          justifyContent='flex-end'
          marginTop='5'
        >
          <Link
            padding='2'
            alignItems='center'
            justifyContent='center'
            display='flex'
            onClick={handleSignOut}
          >
            <Icons.MdExitToApp color='#fff' size={28} />
          </Link>
        </Flex>
      </Flex>
    </Container>
  )
}
export default Home
