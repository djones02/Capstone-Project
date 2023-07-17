import React from 'react'
import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons"

export default function Search({handleSearch}) {
  function handleChange(event) {
    handleSearch(event.target.value);
  }
  return (
    <InputGroup>
      <Input
        placeholder='Search...'
        onChange={event => handleChange(event)}
        name='search'
      />
      <InputRightElement>
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
    
  )
}
