import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import { getListingById, getCarts, addCart, addCartedItem } from '../features/helpers';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Input
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import ListingEdit from '../components/ListingEdit';
import EditListingModal from '../components/EditListingModal';

export default function ListingById() {
  const [listingData, setListingData] = useState()
  const [toggle, setToggle] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [cartList, setCartList] = useState([])
  const [isAdded, setIsAdded] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedAmount, setSelectedAmount] = useState(1);
  const {id} = useParams()
  useEffect(() => {
    getListingById(id)
      .then((listing) => {
        setListingData(listing)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])
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
            console.error(error)
        })
    }
  }, [])
  function handleAddToCart() {
    if (user !== null) {
        const user_id = user.id
        getCarts()
            .then((carts) => {
                const userCart = carts.filter(cart => cart.user_id === user_id)
                if (userCart.length === 0) {
                    addCart(user_id)
                        .then(new_cart => {
                            setCartList(prev => [...prev, new_cart])
                            console.log(new_cart.id)
                            addCartedItem({listing_id: listingData?.id, amount: selectedAmount, cart_id: new_cart.id})
                                .then((cartedItem) => {
                                    setCartList(prevCartList => [...prevCartList, cartedItem]);
                                    setIsAdded(prev => ! prev)
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                        })
                        .catch(error => {
                            console.error(error)
                        })
            } else {
                setCartList(prev => [...prev, userCart])
                addCartedItem({listing_id: listingData?.id, amount: selectedAmount})
                    .then((cartedItem) => {
                        setCartList(prevCartList => [...prevCartList, cartedItem]);
                        setIsAdded(prev => ! prev)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
  }
  function handleAmountChange(event) {
    setSelectedAmount(Number(event.target.value));
  }
  function handleIncrement() {
      setSelectedAmount(prevAmount => prevAmount + 1);
  }
  function handleDecrement() {
      if (selectedAmount > 1) {
          setSelectedAmount(prevAmount => prevAmount - 1);
      }
  }
  function toggleShowEdit() {
    setShowEdit(prev => !prev)
  }
  function toggled() {
    setToggle(prev => !prev)
  }
  function handleListingUpdate(listing) {
    setListingData(listing)
  }
  return (
    <Container maxW={'7xl'}>
      {showEdit && (
        <EditListingModal 
          isOpen={showEdit}
          onOpen={toggleShowEdit}
          onClose={toggleShowEdit}
          handleListingUpdate={handleListingUpdate}
          listing={listingData}
        />
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={listingData?.picture}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {listingData?.name}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              ${listingData?.price}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {listingData?.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Details
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Quality:
                  </Text>{' '}
                  {listingData?.quality}
                </ListItem>
              </List>
            </Box>
            <Box>
              <Input 
                type="number"
                min="1"
                value={selectedAmount}
                onChange={handleAmountChange}
                size="sm"
                width="20%"
              />
              <Button size="sm" rounded="full" onClick={handleDecrement}>-</Button>
              <Button size="sm" rounded="full" onClick={handleIncrement}>+</Button>
            </Box>
          </Stack>
            {user?.id === listingData?.user_id && (
              <Button
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('gray.900', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                onClick={toggleShowEdit}>
                {showEdit ? "Edit Listing" : "Edit Listing"}
              </Button>
            )}
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={handleAddToCart}>
              {isAdded ? "In Cart" : "Add to Cart"}
            </Button>
          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

