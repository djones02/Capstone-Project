import React, {useState, useEffect, useTransition, Suspense} from 'react'
import { getUsers, searchUsers } from '../features/helpers'
import {Container, Image, Button,  Box, InputGroup, SimpleGrid} from "@chakra-ui/react";
import UserCard from '../components/UserCard';
import Search from '../components/Search';
export default function Users() {
  const [usersList, setUsersList] = useState([])
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getUsers(currentPage).then(data => {
      setUsersList(data.users)
      setHasNext(data.has_next)
      setHasPrev(data.has_prev)
      setCurrentPage(data.page)
    })
  }, [currentPage])
  function handleSearch(search) {
    if (search.length > 1) {
      searchUsers(search.toLowerCase())
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
      <div>
        <Box className='mt-24'>
          <InputGroup 
            mt={4}
            width={{base: "90%", md: "md"}}
            textAlign={"center"}>
            <Search handleSearch={handleSearch}/>
          </InputGroup>
        </Box>
      </div>
      <div className='my-4'>
        <div className='mx-auto join w-1/3 grid grid-cols-2 max-w-xs'>
          <button 
            onClick={() => setCurrentPage(current => current -1)}
            className={hasPrev ? "join-item btn btn-outline border-white bg-black text-white rounded-full" : "join-item btn btn-outline btn-disabled border-white bg-black text-white rounded-full"}>
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(current => current + 1)}
            className={hasNext ? "join-item btn btn-outline border-white bg-black text-white rounded-full" : "join-item btn btn-outline btn-disabled border-white bg-black text-white rounded-full"}>
            Next
          </button>
        </div>
        <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} className='mb-28 mx-4 mt-4'>
          {!searchResults || searchResults.length < 1 ? (
            usersList.map(user => (
              <UserCard key={user.id} user={user}/>
            ))
          ) : (
            searchResults.map(user => (
              <UserCard key={user.id} user={user}/>
            ))
          )}
        </SimpleGrid>
      </div>
    </div>
  )
}

