/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Flex, Spinner, Text } from '@chakra-ui/react'

import { Container, ImageItems } from 'src/components'
import { favoritesService } from 'src/services'

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [allFavorites, setAllFavorites] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIdUser] = useState('')

  useEffect(() => {
    const UserLog = JSON.parse(localStorage.getItem('t3d-user') || '{}')
    // setIsFree(UserLog.user.type === 'free')
    setIdUser(UserLog.user._id)
  }, [])

  const getFavorites = async () => {
    setIsLoading(true)

    await favoritesService
      .findAll()
      .then(res => {
        setAllFavorites(res.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container showSidebar>
      <Flex w='100%' h='100%' flexDir='column' justify='flex-start' align='flex-start'>
        <Flex w='100%' justify={['center', 'flex-start']}>
          <Text color='white' fontSize='50' my='8'>
            Favoritos
          </Text>
        </Flex>
        {isLoading ? (
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
          allFavorites?.length && (
            <InfiniteScroll
              dataLength={allFavorites?.length}
              next={() => null}
              hasMore={true}
              // loader={<Spinner />}
              loader={null}
              style={{
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <ImageItems items={allFavorites} handleToggleFavorite={getFavorites} />
            </InfiniteScroll>
          )
        )}
      </Flex>
    </Container>
  )
}
export default Favorites
