/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Flex, Text } from '@chakra-ui/react'

import { Container, ImageItems, Spinner } from 'src/components'
import { productService } from 'src/services'
import { logger } from 'src/utils'

const Products = ({ location }: any) => {
  const [items, setItems] = useState<any[]>([])
  const [nct, setNct] = useState(null)
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  // const [isFree, setIsFree] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIdUser] = useState('')

  const [prefix, setPrefix] = useState(undefined)

  async function loadData() {
    console.log('loadData', { prefix, nct })
    setIsFetching(true)

    if (prefix) {
      await productService
        .findItems(prefix || undefined, nct || undefined)
        .then((res: any) => {
          const filesOrFolders = res.data?.folders || res.data?.files
          console.log({ nct: res.data?.nct })
          setItems(prevState => [...prevState, ...filesOrFolders])

          setNct(res?.data?.nct)
        })
        .catch(err => logger.info({ err }))
        .finally(() => {
          setIsFetching(false)
          setIsLoadingItems(false)
        })
    }
  }

  useEffect(() => {
    const UserLog = JSON.parse(localStorage.getItem('t3d-user') || '{}')
    // setIsFree(UserLog.user.type === 'free')
    setIdUser(UserLog.user._id)
  }, [])

  useEffect(() => {
    setItems([])

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix])

  useEffect(() => {
    setNct(null)
    setPrefix(location.state.folderName)
  }, [location.state.folderName])

  return (
    <Container showSidebar productName={location.state.name}>
      {isLoadingItems ? (
        <Flex
          flexDirection='column'
          flex='1'
          height='100%'
          justify='center'
          align='center'
          mt='25vh'
        >
          <Spinner />
        </Flex>
      ) : (
        <Flex w='100%' flexDir='column' justify='flex-start' align='flex-start'>
          <Flex w='100%' justify={['center', 'flex-start']}>
            <Text color='white' fontSize='50' my='8'>
              {location.state.name}
            </Text>
          </Flex>
          {items.length ? (
            <InfiniteScroll
              dataLength={items?.length}
              next={nct ? loadData : () => null}
              hasMore={true}
              loader={
                nct && (
                  <Flex w='100%' h='100%' align='center' justify='center' mt={10}>
                    <Spinner />
                  </Flex>
                )
              }
              style={{
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <ImageItems items={items} />
            </InfiniteScroll>
          ) : (
            !isFetching && (
              <Text color='#fff' marginTop={150}>
                Não foi encontrado nenhum item
              </Text>
            )
          )}
        </Flex>
      )}
    </Container>
  )
}
export default Products
