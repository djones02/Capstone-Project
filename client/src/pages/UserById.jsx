import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById, filteredListings } from '../features/helpers'
import {
  Container, 
  Button, 
  Image, 
  Text, 
  Box, 
  SimpleGrid, 
  Flex,
  Badge,
  Center,
  Heading,
  Stack,
  chakra,
  VStack,
  StackDivider,
  VisuallyHidden,
  List,
  ListItem
} from "@chakra-ui/react";
import ListingCard from '../components/ListingCard';
export default function UserById() {
  const [userData, setUserData] = useState()
  const [currentUserData, setCurrentUserData] = useState()
  const [userListings, setUserListings] = useState([])
  const {id} = useParams()
  useEffect(() => {
    getUserById(id)
      .then((user) => {
        setUserData(user)
        handleFilter(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])
  function handleFilter(user) {
    if (user !== null) {
      const user_id = parseInt(user?.id)
      filteredListings(user_id)
        .then((listings) => {
          console.log(listings)
          setUserListings(listings)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  return (
    <div>
      {/* <Container centerContent maxW="600px">
        <SimpleGrid className='my-4 flex' columns={[2]} spacing="20px">
          <Box 
            display="flex"
            height="400px"
            width="300px"
            alignItems="center">
            <Container className='flex flex-col px-0 items-center'>
              <Image 
                src={userData?.pfp ? userData?.pfp : "https://placekitten.com/250/250"}
                alt='Profile Picture Image'
                boxSize="200px"
                objectFit="cover"
                borderRadius="full"
              />
              
            </Container>
          </Box>
          <Container className='flex flex-col px-0 items-center'>
            <Box 
              display="flex"
              height="400px"
              width="300px"
              alignItems="center"
            >
              <Container>
                <div className='text-bold text-2xl text-center'>
                  {userData?.name.toUpperCase() || "name would go here"}
                </div>
                <div className='text-center'>
                  <b>Email:</b> {userData?.email || "email goes here"}
                </div>
              </Container>
            </Box>
          </Container>
        </SimpleGrid>
      </Container> */}
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={userData?.pfp ? userData?.pfp : "https://placekitten.com/250/250"}
              fit={'cover'}
              align={'center'}
              w={{base:'100%', sm: "300px", md:"400px", lg: "500px"}}
              h={{ base: '100%', sm: '300px', md:"400px", lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {userData?.name.toUpperCase() || "name would go here"}
              </Heading>
              <Text
                fontWeight={300}
                fontSize={'2xl'}>
                {userData?.email || "email goes here"}
              </Text>
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <SimpleGrid columns={{sm: 2, md: 3}}>
        {userListings.map(listing => (
          <ListingCard key={listing.id} listing={listing}/>
        ))}
      </SimpleGrid>
    </div>
  )
}
