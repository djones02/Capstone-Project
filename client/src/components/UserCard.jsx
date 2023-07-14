import React from 'react'
import {Link} from "react-router-dom"
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react";

export default function UserCard({user}) {
  return (
    <Container className='px-4 bg' p="2">
        <div
            className='card max-w-10 bg-gray-600 shadow-xl'>
            <figure className='px-0 pt-10 h-50 object-contain'>
                <Image 
                    src={
                        user.pfp ? user.pfp : "https://placekitten.com/250/250"
                    }
                    alt={user.name}
                    boxSize="100px"
                    objectFit="contain"
                    className='rounded-xl'
                />
            </figure>
            <div className='card-body items-center text-center'>
                <h2 className='card-title'>{user.name}</h2>
                <div className='card-actions'>
                    <Link to={`/user/${user.id}`}>
                        <Button>View Profile</Button>
                    </Link>
                </div>
            </div>
        </div>
    </Container>
  )
}
