import React from 'react'
import {
    Box,
    Container,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <Box
            bg={'gray.600'}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    <Link to="/home">Home</Link>
                    <Link >About</Link>
                    <Link >Contact</Link>
                </Stack>
                <Text>© 2022 Stop & Shop. All rights reserved</Text>
            </Container>
        </Box>
      );
}
