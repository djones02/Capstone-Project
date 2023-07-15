import React, {useState, useEffect, useContext} from 'react'
import { getCarts, getCurrentUser, getCartedItems } from '../features/helpers'
import { Link, useParams } from 'react-router-dom';
import CartedItemCard from "../components/CartedItemCard"
import CartOrderSummary from '../components/CartOrderSummary';
import {
  SimpleGrid,
  GridItem,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Search from '../components/Search';

export default function Cart() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [cartedItemsList, setCartedItemsList] = useState([])
  useEffect(() => {
    if (user == null) {
      fetch("/api/@me")
        .then(response => {
          if (response.ok) {
            response.json().then(user => {
              setUser(user)
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])
  useEffect(() => {
    if (user) {
      // const user_id = user.id
      getCarts()
      .then((carts) => {
        const userCart = carts.find(cart => cart.user_id === user.id)
        if (userCart) {
          getCartedItems(userCart.id)
            .then(items => {
              const filteredItems = items.filter(item => item.cart_id === userCart.id)
              setCartedItemsList(filteredItems)
              setCart(userCart)
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }, [user])
  return (
    <Box
      maxW={{base: "3xl", lg:"7xl"}}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{base:"column", lg:"row"}}
        align={{lg: "flex-start"}}
        spacing={{base:"8", md:"16"}}
      >
        <Stack spacing={{base:"8", md:"10"}} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({(cartedItemsList.length)})
          </Heading>
          <Stack spacing="6">
          {cartedItemsList.map((item) => {
            return <CartedItemCard key={item.id} item={item} />
          })}
          </Stack>
        </Stack>
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary cartedItemsList={cartedItemsList}/>
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link to="/listings">Continue Shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
    // <div className='flex flex-col items-center justify-center min-h-screen'>
    //   <SimpleGrid columns={1}>
        // {cartedItemsList.map((item) => {
        //   return <CartedItemCard key={item.id} item={item} />
        // })}
    //   </SimpleGrid>
    // </div>
  )
}
