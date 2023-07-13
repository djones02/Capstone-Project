import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import { getListingById } from '../features/helpers';
import {Container, Image, Button, Box, Flex} from "@chakra-ui/react";
import ListingEdit from '../components/ListingEdit';

export default function ListingById() {
  const [listingData, setListingData] = useState()
  const [toggle, setToggle] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
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
    <Box className=''>
      <Container centerContent className='gap-8'>
        <Container className='my-4 flex'>
          <Container boxSize="250px" className='flex flex-col'>
            <Image 
              src={listingData?.picture}
              alt={listingData?.name}
            />
            <div className='min-h-24'>
              In Stock: {listingData?.amount}
            </div>
            <div className='min-h-24'>
              Price: ${listingData?.price}
            </div>
          </Container>
          <Container>
            {showEdit ? (
              <ListingEdit 
                listing={listingData} 
                handleListingUpdate={handleListingUpdate} 
                toggleShowEdit={toggleShowEdit}/>
            ) : (
              <Button 
                onClick={toggleShowEdit} 
                className='w-[150px] bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-800 transition duration-300'>
                Edit Listing
              </Button>
            )}
            <p>
              <b>{listingData && listingData.name ? listingData.name : "Pending"}</b>
            </p>
            <p>
              <b>
                Date Posted {" "}
              </b>
              {listingData && listingData.created_at ? listingData.created_at : "Pending"}
            </p>
            <p>
              <b>
                Quality: {" "}
              </b>
              {listingData && listingData.quality ? listingData.quality : "Pending"}
            </p>
            <p>
              <b>
                Description: {" "}
              </b>
              {listingData && listingData.description ? listingData.description : "Pending"}
            </p>
          </Container>
        </Container>
      </Container>
    </Box>
  )
}

