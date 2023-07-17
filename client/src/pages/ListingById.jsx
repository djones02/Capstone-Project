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
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
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
            mt={24}
            style={{boxShadow:"4px 6px 15px rgba(0, 0, 0, 1)"}}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              className='text-white'>
              {listingData?.name}
            </Heading>
            <Text
              fontWeight={300}
              fontSize={'2xl'}
              className='text-white'>
              ${listingData?.price}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={"#F5F5F5"}
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                className='text-white'
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
                mb={'4'}
                className='text-white'>
                Product Details
              </Text>
              <List spacing={2}>
                <ListItem className='text-white'>
                  <Text as={'span'} fontWeight={'bold'} className='text-white'>
                    Quality:
                  </Text>{' '}
                  {listingData?.quality}
                </ListItem>
              </List>
            </Box>
            <Box>
              <b className='mr-4 text-white'>Amount:</b>
              <Input 
                type="number"
                min="1"
                value={selectedAmount}
                onChange={handleAmountChange}
                size="sm"
                width="10%"
                borderRadius={"full"}
                mr={2}
                mt={2}
                color={"#483D3F"}
                backgroundColor={"#F5F5F5"}
              />
              <button style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}} className='btn btn-sm rounded-full text-white font-black bg-black hover:bg-gray transition duration-300 border-none mx-2' onClick={handleDecrement}><MinusIcon/></button>
              <button style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}} className='btn btn-sm rounded-full text-white font-black bg-black hover:bg-gray transition duration-300 border-none mx-2' onClick={handleIncrement}><AddIcon/></button>
            </Box>
          </Stack>
            {user?.id === listingData?.user_id && (
              <Button
                rounded={'full'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={"#483D3F"}
                color={"#F5F5F5"}
                textTransform={'uppercase'}
                style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#584B4D"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#483D3F"}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                onClick={toggleShowEdit}>
                {showEdit ? "Edit Listing" : "Edit Listing"}
              </Button>
            )}
            <Button
              rounded={'full'}
              w={'full'}
              mt={8}
              mb={2}
              size={'lg'}
              py={'7'}
              bg={"#483D3F"}
              color={"#F5F5F5"}
              textTransform={'uppercase'}
              style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#584B4D"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#483D3F"}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={handleAddToCart}>
              {isAdded ? "In Cart" : "Add to Cart"}
            </Button>
          <Stack direction="row" alignItems="center" justifyContent={'center'} mb={32}>
            <MdLocalShipping color='white'/>
            <Text className='text-white'>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

