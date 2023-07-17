import React, {useState, useEffect, useMemo, useTransition, Suspense} from 'react'
import {getListings, searchListings} from "../features/helpers"
import {
  SimpleGrid,
  GridItem,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Flex
} from "@chakra-ui/react"
import AddListingModal from "../components/AddListingModal"
import Search from '../components/Search'
import ListingCard from '../components/ListingCard'


export default function Listings() {
  const [listingsList, setListingsList] = useState([])
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [showInputs, setShowInputs] = useState(false)
  const [currentPage, setCurrentPage] = useState()
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getListings(currentPage).then(data => {
      setListingsList(data.listings)
      setHasNext(data.has_next)
      setHasPrev(data.has_prev)
      setCurrentPage(data.page)
    })
  }, [currentPage])
  function addNewListing(listing) {
    setListingsList([listing, ...listingsList])
  }
  function toggleShowInputs() {
    setShowInputs(prev => !prev)
  }
  function handleSearch(search) {
    if (search.length > 1) {
      searchListings(search.toLowerCase())
        .then(users => {
          if (users.message) {
            setSearchResults("")
          } else {
            setSearchResults(users)
          }
        })
    } else {
      setSearchResults("")
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {showInputs && (
        <AddListingModal 
          isOpen={showInputs}
          onOpen={toggleShowInputs}
          onClose={toggleShowInputs}
          addNewListing={addNewListing}
        />
      )}
      <div>
        <Flex>
          <Box>
            <Button onClick={toggleShowInputs}>
              {showInputs ? "Add New Listing" : "Add New Listing"}
            </Button>
          </Box>
          <Box>
            <InputGroup mt={4} width={{base: "90%", md: "md"}} textAlign={"center"}>
              <Search handleSearch={handleSearch}/>
            </InputGroup>
          </Box>
        </Flex>
      </div>
      <div className='my-4'>
        <div className='mx-auto join w-1/3 grid grid-cols-2'>
          <Button
            className={hasPrev ? "join-item btn-outline" : "join-item btn btn-outline btn-disabled"}
            onClick={() => setCurrentPage(current => current -1)}>
            Previous
          </Button>
          <Button 
            className={hasNext ? "join-item btn btn-outline" : "join-item btn btn-outline disabled"}
            onClick={() => setCurrentPage(current => current + 1)}>
            Next
          </Button>
        </div>
        <SimpleGrid columns={{sm: 2, md: 3}}>
          {!searchResults || searchResults.length < 1 ? (
            listingsList.map(listing => (
              <ListingCard key={listing.id} listing={listing}/>
            ))
          ) : (
            searchResults.map(listing => (
              <ListingCard key={listing.id} listing={listing}/>
            ))
          )}
        </SimpleGrid>
      </div>
    </div>
  )
}

