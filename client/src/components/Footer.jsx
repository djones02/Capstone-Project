import React from 'react'
import {
    Box,
    Container,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Footer({user}) {
    return (
        <Box className='bg-black fixed inset-x-0 bottom-0 p-2'
            style={{position:"fixed", left:0, right:0, bottom:0, zIndex:'9999', boxShadow:"1px 5px 25px rgba(0, 0, 0, 1)"}}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={2}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    {user ? (
                        <div>
                            <Link className='text-xl text-white hover:bg-gray px-6 py-2 rounded-xl' to="/home">Home</Link>
                            <Link className='text-xl text-white hover:bg-gray px-6 py-2 rounded-xl' to="/about">About</Link>
                            <Link className='text-xl text-white hover:bg-gray px-6 py-2 rounded-xl' to="/contact">Contact</Link>
                        </div>
                    ) : null}
                </Stack>
                <Text className='text-xl text-white'>© 2023 Stop & Shop. All rights reserved</Text>
            </Container>
        </Box>
      );
}
