import React from 'react'
import { SimpleGrid, GridItem, Container, Box } from '@chakra-ui/react'

export default function Contact() {
    return (
        <Container maxWidth={"1200px"} px={4}>
            <SimpleGrid columns={{sm:1, md:2, lg:3}} gap={10} pt={44} px={4}>
                <Box style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}} minH={"200px"} className='bg-black rounded-xl text-white pt-4 text-center'>
                    <p className='text-3xl font-bold'>Business Address</p>
                    <p className='pt-4'>Stop&Shop Inc.</p>
                    <p>386 Auto Parts Street</p>
                    <p>Faketown, FL 98765</p>
                    <p>United States</p>
                </Box>
                <Box style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}} minH={"200px"} className='bg-black rounded-xl text-white pt-4 text-center'>
                    <p className='text-3xl font-bold'>Customer Support</p>
                    <p className='pt-8'><b>Email: </b>support@stopnshop.com</p>
                    <p><b>Phone Number: </b>+1 (800) 555-5789</p>
                </Box>
                <Box style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}} minH={"200px"} className='bg-black rounded-xl text-white pt-4 text-center'>
                    <p className='text-3xl font-bold'>Tech Support</p>
                    <p className='pt-8'><b>Email: </b>techsupport@stopnshop.com</p>
                    <p><b>Phone Number: </b>+1 (877) 555-4321</p>
                </Box>
            </SimpleGrid>
        </Container>
    )
}
