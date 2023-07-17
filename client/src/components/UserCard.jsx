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
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={'gray.600'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
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
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {user?.name}
                </Heading>
                <Text fontWeight={600} mb={4}>
                    {user?.email}
                </Text>
                <Stack>
                    <Link to={`/user/${user.id}`}>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            _focus={{
                            bg: 'gray.200',
                        }}>
                            View Profile
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Center>
    )
}
