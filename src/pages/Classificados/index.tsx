import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { Flex, Text, Button, Stack, ButtonGroup, Link } from '@chakra-ui/react'

import { Container } from 'src/components'
import InputForm from 'src/components/InputForm'
import { classificadosService } from 'src/services'
import { logger } from 'src/utils'

const Classificados = () => {
  const [showPage1] = useState(false)
  const [showPage2] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [classificados, setClassifiados] = useState<any[]>([])

  useEffect(() => {
    async function loadClassificados() {
      await classificadosService
        .findAllClassificados()
        .then(res => {
          setClassifiados(res)
        })
        .catch(error => {
          logger.info({ errorLoadProducts: error })
        })
    }
    loadClassificados()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container showSidebar>
      {showPage1 && (
        <Flex
          w='100%'
          h='100%'
          flexDir='column'
          justify='flex-start'
          align='center'
          pr='10'
        >
          <Flex w='100%' justify={['center', 'flex-start']}>
            <Text color='white' fontSize='50' my='8'>
              ANÚNCIOS
            </Text>
          </Flex>
          <Flex w='100%'>
            <Stack direction='column' w='100%' h='100%'>
              <Button
                bgGradient='linear(to-r, purple.900, white)'
                w='100%'
                h='20'
                transition='0.3s'
                _hover={{ bg: 'purple.900', color: 'white' }}
                leftIcon={<AiOutlinePlus />}
              >
                Criar anúncio
              </Button>
              <Flex flexDir='column' w='100%' h='100%'>
                <Stack direction='column' w='100%' h='100%'>
                  <Flex
                    w='100%'
                    h='10'
                    justify='space-between'
                    align='center'
                    borderRadius='8'
                    px='10'
                  >
                    <Text w='33%' color='gray.50'>
                      Título do anúncio
                    </Text>
                    <Text w='33%' color='gray.50'>
                      Data de criação
                    </Text>
                    <Flex w='33%'></Flex>
                  </Flex>
                  {classificados?.map((item, index) => (
                    <Flex
                      key={index}
                      w='100%'
                      h='20'
                      bg='gray.400'
                      justify='space-between'
                      align='center'
                      borderRadius='8'
                      px='10'
                    >
                      <Text w='33%' color='gray.50'>
                        {item.description}
                      </Text>
                      <Text w='33%' color='gray.50'>
                        {item.date}
                      </Text>
                      <ButtonGroup
                        w='33%'
                        display='flex'
                        justifyContent='center'
                        variant='outline'
                        spacing='6'
                      >
                        <Button
                          colorScheme='transparent'
                          borderColor='gray.50'
                          color='gray.50'
                        >
                          Editar
                        </Button>
                        <Button
                          colorScheme='transparent'
                          borderColor='gray.50'
                          color='gray.50'
                        >
                          Excluir
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  ))}
                </Stack>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      )}
      {showPage2 && (
        <Flex
          w='100%'
          h='100%'
          flexDir='column'
          justify='flex-start'
          align='center'
          pr='10'
        >
          <Flex w='100%' justify={['center', 'flex-start']}>
            <Text color='white' fontSize='50' my='8'>
              ANÚNCIOS
            </Text>
          </Flex>
          <Flex w='100%' h='100%'>
            <InputForm
              as={Link}
              w='100%'
              h='24'
              display='flex'
              alignItems='center'
              justifyContent='center'
              label='Adicionar Foto'
            />
          </Flex>
        </Flex>
      )}
    </Container>
  )
}
export default Classificados
