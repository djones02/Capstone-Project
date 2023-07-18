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
    <div className='pb-32'>
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
          px={{base: 18, md: 24}}>
          <Flex>
            <Image
              rounded={'full'}
              alt={'product image'}
              src={userData?.pfp ? userData?.pfp : "https://placekitten.com/250/250"}
              fit={'cover'}
              align={'center'}
              mt={20}
              w={{base:'100%', sm: "300px", md:"400px", lg: "500px"}}
              h={{ base: '100%', sm: '300px', md:"400px", lg: '500px' }}
              style={{boxShadow:"4px 6px 15px rgba(0, 0, 0, 1)"}}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }} justifyContent={"space-around"}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                className='text-white'
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {userData?.name.toUpperCase() || "name would go here"}
              </Heading>
              <Text
                fontWeight={300}
                className='text-white'
                fontSize={'2xl'}>
                {userData?.email || "email goes here"}
              </Text>
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Container maxW={"8xl"}>
        {userListings.length > 0 ? (
          <SimpleGrid columns={{sm: 1, md: 2, lg:3, xl:4}}>
            {userListings.map(listing => (
              <ListingCard key={listing.id} listing={listing}/>
            ))}
          </SimpleGrid>
        ) : (
          <p className='text-white'>"No Listings Yet"</p>
        )}
      </Container>
    </div>
  )
}
