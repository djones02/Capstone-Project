import React from 'react'
import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons"

export default function Search({handleSearch}) {
  function handleChange(event) {
    handleSearch(event.target.value);
  }
  return (
    <InputGroup className='bg-white rounded-full ml-6 my-6' style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}>
      <Input
        placeholder='Search...'
        onChange={event => handleChange(event)}
        name='search'
        borderRadius={"full"}
        color={"black"}
      />
      <InputRightElement>
        <SearchIcon color={"black"}/>
      </InputRightElement>
    </InputGroup>
    
  )
}
