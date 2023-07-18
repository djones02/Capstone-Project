import React from 'react'
import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { FiGift } from 'react-icons/fi'

export default function CartItemMeta(props) {
    const { isGiftWrapping = true, picture, name, description} = props
    return (
        <Stack direction="row" spacing="4" width="full">
            <Image 
                rounded="lg"
                width="120px"
                height="120px"
                fit="cover"
                src={picture}
                alt={name}
                draggable="false"
                loading="lazy"
                mr={2}
                style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}}
            />
            <Box>
                <Stack spacing="1">
                    <Text className='text-white font-black text-2xl'>{name}</Text>
                    <Text className='text-white text-sm'>
                        {description}
                    </Text>
                </Stack>
                {isGiftWrapping && (
                    <HStack spacing="1" mt="3" className='text-white'>
                        <Icon as={FiGift} boxSize="4" />
                        <Link fontSize="sm" textDecoration="underline">
                            Add gift wrapping
                        </Link>
                    </HStack>
                )}
            </Box>
        </Stack>
    )
}
