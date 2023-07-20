import React from 'react'
import { Container, Box } from '@chakra-ui/react'

export default function About() {
    return (
        <Container maxWidth={"1200px"} px={20} >
            <div className='pt-44 text-center' >
                <Box className='bg-black rounded-2xl py-4 px-4' style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}}>
                    <p className='text-white py-4 px-4'>Welcome to Stop & Shop, your premier destination for buying and selling new and used car parts! We are passionate about providing a seamless and efficient platform for auto enthusiasts, mechanics, and car owners to find the perfect parts they need to keep their vehicles running smoothly.</p>
                    <p className='text-white py-4 px-4'>At Stop & Shop, we understand the challenges that come with searching for reliable and affordable car parts. That's why we've built a robust online marketplace that connects buyers and sellers from around the world. Whether you're looking for a rare vintage component or a brand-new part for your latest model, our platform has got you covered.</p>
                    <p className='text-white py-4 px-4'>Whether you're an individual looking for that perfect replacement part or a business searching for reliable suppliers, Stop & Shop is here to meet your needs. Join our growing community of automotive enthusiasts today and experience the convenience, affordability, and reliability of our platform.</p>
                    <p className='text-white py-4 px-4'>If you have any questions or need assistance, our dedicated customer support team is always here to help. Get ready to explore the world of auto parts like never before with Stop & Shop!</p>
                </Box>
            </div>
        </Container>
    )
}
