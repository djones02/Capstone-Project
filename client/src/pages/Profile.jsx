import React, {useState, useEffect} from 'react'
import {
  Link,
  useLoaderData,
  useParams,
  useOutletContext,
} from "react-router-dom";
import {getCurrentUser, getListings, getListingById, filteredOrderItems, filteredListings} from "../features/helpers"
import {
  Container,
  Image,
  Box,
  SimpleGrid,
  Button,
  Text,
  Divider,
  Flex,
  Circle,
  Badge,
  Icon,
  chakra,
  Tooltip,
  Center,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { FiShoppingCart } from 'react-icons/fi';
import EditUserModal from "../components/EditUserModal"

export default function Profile() {
  const [profileData, setProfileData] = useState()
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [userListings, setUserListings] = useState([])
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    if (user === null) {
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
    } else {
      handleFilter()
      handleOrderItemFilter()
    }
  }, [user])
  function handleFilter() {
    if (user !== null) {
      const user_id = user?.id
      filteredListings(user_id)
        .then((listings) => {
          setUserListings(listings)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  console.log(orderItems)
  function handleOrderItemFilter() {
    if (user !== null) {
      filteredOrderItems()
        .then((orderItems) => {
          if (!orderItems || orderItems.length === 0) {
            setOrderItems([])
            return
          }
          const listingIds = orderItems.map((orderItem) => orderItem.listing_id);
          const fetchListingPromises = listingIds.map((listingId) =>
            getListingById(listingId)
          );
          Promise.all(fetchListingPromises)
            .then((listings) => {
              const updatedOrderItems = orderItems.map((orderItem, index) => {
                const listing = listings[index] || null;
                return { ...orderItem, listing };
              });
              setOrderItems(updatedOrderItems);
              console.log(updatedOrderItems);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOrderItems([])
    }
  }
  function toggleShowForm() {
    setShowForm(prev => !prev)
  }
  function handleUserUpdate(user) {
    setUser(user)
  }
  return (
    <div>
      {showForm && (
        <EditUserModal 
          isOpen={showForm}
          onOpen={toggleShowForm}
          onClose={toggleShowForm}
          handleUserUpdate={handleUserUpdate}
          user={user}
        />
      )}
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
          px={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'full'}
              alt={'product image'}
              src={user?.pfp ? user?.pfp : "https://placekitten.com/250/250"}
              fit={'cover'}
              align={'center'}
              w={{base:'100%', sm: "300px", md:"400px", lg: "500px"}}
              h={{ base: '100%', sm: '300px', md:"400px", lg: '500px' }}
              className='mt-28'
              style={{boxShadow:"4px 6px 15px rgba(0, 0, 0, 1)"}}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }} justifyContent={"space-around"}>
            <Box as={'header'}>
              <Heading
                className='text-white'
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {user?.name.toUpperCase() || "name would go here"}
              </Heading>
              <Text
                className='text-white mb-6'
                fontWeight={300}
                fontSize={'2xl'}>
                {user?.email || "email goes here"}
              </Text>
              <div>
                {!showForm ? (
                  <button
                    style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                    className='btn btn-sm rounded-full border-none w-[125px] h-[50px] bg-black text-white text-sm font-bold py-2 px-4 hover:bg-gray transition duration-300'
                    onClick={toggleShowForm}>
                    Edit User
                  </button>
                ) : (
                  null
                )}
              </div>
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Container maxW="1000px" mt={6}>
        <div>
          <Text className="text-center font-bold text-white" fontSize={50}>
            Listings
          </Text>
          {userListings.length > 0 ? (
            <SimpleGrid columns={{sm:1, md:2, lg:3}} spacing="40px" className='mt-4'>
              {userListings.map(listing => (
                <Center py={12} key={listing.id}>
                  <Box
                      role={'group'}
                      p={6}
                      maxW={'330px'}
                      w={'full'}
                      boxShadow={'2xl'}
                      rounded={'lg'}
                      pos={'relative'}
                      zIndex={1}
                      className='bg-black'
                      style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}}>
                      <Box
                          rounded={'lg'}
                          mt={-12}
                          pos={'relative'}
                          height={'230px'}
                          marginTop={"5px"}
                          _after={{
                              transition: 'all .3s ease',
                              content: '""',
                              w: 'full',
                              h: 'full',
                              pos: 'absolute',
                              top: 5,
                              left: 0,
                              backgroundImage: `url(${listing.picture})`,
                              filter: 'blur(15px)',
                              zIndex: -1,
                          }}
                          _groupHover={{
                              _after: {
                              filter: 'blur(20px)',
                              },
                          }}>
                          <Image
                              rounded={'lg'}
                              height={230}
                              width={282}
                              objectFit={'cover'}
                              src={listing.picture}
                          />
                      </Box>
                      <Stack pt={10} align={'center'}>
                          <Text className='text-white' fontSize={'sm'} textTransform={'uppercase'}>
                              {listing.quality}
                          </Text>
                          <Heading className='text-white' fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                              {listing.name}
                          </Heading>
                          <Stack direction={'row'} align={'center'}>
                              <Text className='text-white' fontWeight={800} fontSize={'xl'}>
                                  ${listing.price}
                              </Text>
                              <Text className='text-black-900' textDecoration={'line-through'}>
                                  ${Math.round(listing.price * 1.2)}
                              </Text>
                          </Stack>
                      </Stack>
                    </Box>
                </Center>
              ))}
            </SimpleGrid>
          ) : (
            <p className='text-white'>"No Listings Yet"</p>
          )}
        </div>
        <div>
          <Text className='text-center font-bold text-white mb-6' fontSize={50}>
            Orders To Fill
          </Text>
          <div className='overflow-x-auto'>
            <table className='table mb-32'>
              <tbody>
                {orderItems && orderItems.length > 0 ? (
                  orderItems.map(orderItem => (
                    <tr key={orderItem.id}>
                      <td key={orderItem.id}>
                        <Text className='text-white mt-2' key={orderItem.id}>
                          <b>Posted On: </b>{orderItem.created_at}
                        </Text>
                        {orderItem?.listing ? (
                          <Text className='text-white'><b>Name: </b>{orderItem?.listing.name}</Text>
                        ) : (
                          <Text className='text-white'>No Listings Found</Text>
                        )}
                        <Text className='text-white mb-2'><b>Amount: </b>{orderItem?.amount}</Text>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <p className='text-white'>"No Orders Yet"</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  )
}

