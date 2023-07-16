import React, {useState, useEffect} from 'react'
import {
  Link,
  useLoaderData,
  useParams,
  useOutletContext,
} from "react-router-dom";
import {getCurrentUser, getListings, getListingById, filteredOrderItems} from "../features/helpers"
import {
  Container,
  Image,
  Box,
  SimpleGrid,
  Button,
  Text,
  Divider,
} from "@chakra-ui/react";
import EditUser from "../components/EditUser"

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
      getListings()
        .then((listings) => {
          const userListings = listings.listings.filter(listing => listing.user_id === user_id)
          setUserListings(userListings)
          console.log(userListings)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  function handleOrderItemFilter() {
    if (user !== null) {
      filteredOrderItems()
        .then((orderItems) => {
          console.log(orderItems)
          if (!orderItems || orderItems.length === 0) {
            setOrderItems([])
            return
          }
          const listingIds = orderItems.map((orderItem) => orderItem.id);
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
  // function handleOrderItemFilter() {
  //   if (user !== null) {
  //     filteredOrderItems(user.id)
  //       .then((orderItems) => {
  //         const fetchListingPromises = orderItems.map((orderItem) =>
  //           getListingById(orderItem.id)
  //         );
  //         Promise.all(fetchListingPromises).then((listings) => {
  //           const updatedOrderItems = orderItems.map((orderItem, index) => ({
  //             ...orderItem,
  //             listing: listings[index],
  //           }));
  //           setOrderItems(updatedOrderItems);
  //           console.log(updatedOrderItems);
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }
  function toggleShowForm() {
    setShowForm(prev => !prev)
  }
  return (
    <div>
      <Container maxW="600px">
        <SimpleGrid className="my-4 flex" columns={[2]} spacing="20px">
          <Box
            display="flex"
            bg="gray.400"
            height="400px"
            width="300px"
            alignItems="center"
          >
            <Container className="flex flex-col px-0 items-center">
              <Image 
                src={user?.pfp ? user?.pfp : "https://placekitten.com/250/250"} 
                alt="Profile Picture"
                boxSize="200px"
                objectFit="cover"
                borderRadius="full"
              />
              <div className="text-bold text-2xl text-center">
                {!showForm ? (
                  <Button onClick={toggleShowForm}>
                    Edit User
                  </Button>
                ) : (
                  <Button onClick={toggleShowForm}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </Container>
          </Box>
          <Box display="flex" bg="gray.400" height="400px" alignItems="center">
            {!showForm ? (
              <Container>
                <Container>
                  <div className="text-bold text-2xl text-center">
                    <b>{user?.name.toUpperCase()}</b>
                  </div>
                  <p className='text-center'><b>Email:</b>{user?.email}</p>
                </Container>
              </Container>
            ) : (
              <EditUser 
                user={user}
                toggleShowForm={toggleShowForm}
                className="z-10"
              />
            )}
          </Box>
        </SimpleGrid>
      </Container>
      <Container maxW="1000px" mt={6}>
        <div>
          <Text className="text-center font-bold" fontSize={50}>
            Listings
          </Text>
          {userListings.length > 0 ? (
            <SimpleGrid columns={[3, null, 4]} spacing="40px" className='mt-4'>
              {userListings.slice(0, 4).map(listing => (
                <Box maxW="500px" key={listing.id}>
                  <Image
                    key={listing.id}
                    src={listing.picture}
                    maxwidth={250}
                    objectFit="align"
                    maxHeight={275}
                    border="2px"
                    borderColor="gray.200"
                    className='rounded-xl'
                  />
                  <Text textAlign="center"><b>{listing.name}</b></Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <p>"No Listings Yet"</p>
          )}
        </div>
        <div>
          <Text className='text-center font-bold' fontSize={50}>
            Orders To Fill
          </Text>
          <div className='overflow-x-auto'>
            <table className='table'>
              <tbody>
                {orderItems && orderItems.length > 0 ? (
                  orderItems.map(orderItem => (
                    <tr key={orderItem.id}>
                      <td key={orderItem.id}>
                        <Text key={orderItem.id}>
                          {orderItem.created_at}
                        </Text>
                        {orderItem.listing ? (
                          <Text>{orderItem.listing.name}</Text>
                        ) : (
                          <Text>No Listings Found</Text>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <p>"No Orders Yet"</p>
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

