import React from 'react'
import {Link} from "react-router-dom"
import {
    GridItem, 
    Container, 
    Box, 
    Button, 
    Image,
    Badge,
    Center,
    Flex,
    Heading,
    Stack,
    Text,
    Avatar
} from "@chakra-ui/react";

export default function UserCard({user}) {
    return (
        <Center className='py-8 px-4'>
            <Box
                maxW={'320px'}
                w={'full'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                className='bg-black'
                style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}}>
                <Avatar
                    size={'xl'}
                    src={user?.pfp}
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Heading fontSize={'xl'} className='text-white' fontFamily={'body'}>
                    {user?.name}
                </Heading>
                <Text className='text-white' fontWeight={600} mb={4}>
                    {user?.email}
                </Text>
                <Stack>
                    <Link to={`/user/${user.id}`}>
                        <button className='btn btn-sm rounded-2xl border-white w-[130px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-light_blue transition duration-300 mx-2'>
                            View Profile
                        </button>
                    </Link>
                </Stack>
            </Box>
        </Center>
    )
}
