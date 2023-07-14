import React, {useState, useEffect} from 'react'
import { Link, useParams, useOutletContext } from 'react-router-dom'
import { getUserById } from '../features/helpers'
import {Container, Button, Image, Text, Box, SimpleGrid, Flex} from "@chakra-ui/react";
export default function UserById() {
  const [userData, setUserData] = useState()
  const [user, setUser] = useOutletContext()
  const [currentUserData, setCurrentUserData] = useState()
  const {id} = useParams()
  useEffect(() => {
    getUserById(id)
      .then((user) => {
        setUserData(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])
  console.log(userData)

  return (
    <div>
      <Container centerContent maxW="600px">
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
              <div className='text-bold text-2xl text-center'>
                {userData?.name.toUpperCase() || "name would go here"}
              </div>
              <div>
                <b>Email:</b> {userData?.email || "email goes here"}
              </div>
            </Container>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  )
}
