import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { 
    Container, 
    Box, 
    Button, 
    Image, 
    FormControl, 
    Input, 
    InputGroup, 
    InputRightAddon, 
    Flex,
    Center,
    Heading,
    Text,
    Stack,
} from "@chakra-ui/react"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import {getCarts, addCart, addCartedItem} from "../features/helpers"
export default function ListingCard({listing}) {
    const [user, setUser] = useState(null)
    const [cartList, setCartList] = useState([])
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [isAdded, setIsAdded] = useState(false)
    useEffect(() => {
        if (user == null) {
        fetch("/api/@me")
            .then(response => {
                if (response.ok) {
                    response.json().then(user => {
                        setUser(user)
                    })
                }
            })
            .catch(error => {
                console.error(error)
            })
        }
    }, [])
    function handleAddToCart() {
        if (user !== null) {
            const user_id = user.id
            getCarts()
                .then((carts) => {
                    const userCart = carts.filter(cart => cart.user_id === user_id)
                    if (userCart.length === 0) {
                        addCart(user_id)
                            .then(new_cart => {
                                setCartList(prev => [...prev, new_cart])
                                console.log(new_cart.id)
                                addCartedItem({listing_id: listing.id, amount: selectedAmount, cart_id: new_cart.id})
                                    .then((cartedItem) => {
                                        setCartList(prevCartList => [...prevCartList, cartedItem]);
                                        setIsAdded(prev => ! prev)
                                    })
                                    .catch(error => {
                                        console.error(error)
                                    })
                            })
                            .catch(error => {
                                console.error(error)
                            })
                } else {
                    setCartList(prev => [...prev, userCart])
                    addCartedItem({listing_id: listing.id, amount: selectedAmount})
                        .then((cartedItem) => {
                            setCartList(prevCartList => [...prevCartList, cartedItem]);
                            setIsAdded(prev => ! prev)
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
    function handleAmountChange(event) {
        setSelectedAmount(Number(event.target.value));
    }
    function handleIncrement() {
        setSelectedAmount(prevAmount => prevAmount + 1);
    }
    function handleDecrement() {
        if (selectedAmount > 1) {
            setSelectedAmount(prevAmount => prevAmount - 1);
        }
    }
    return (
        <Center className='py-8 px-4'>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                className='bg-black'
                style={{boxShadow:"6px 8px 15px rgba(0, 0, 0, 1)"}}>
                <Box
                    p={6}
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    marginTop={"5px"}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${listing.picture})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                        filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={listing.picture}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text className='text-white text-sm' textTransform={'uppercase'}>
                        {listing.quality}
                    </Text>
                    <Heading className='text-white' fontFamily={'body'} fontWeight={500}>
                        {listing.name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'} className='text-white'>
                            ${listing.price}
                        </Text>
                        <Text textDecoration={'line-through'} className='text-black.900'>
                            ${Math.round(listing.price * 1.2)}
                        </Text>
                    </Stack>
                    <Stack direction="column" align="center" justify="center" className='mt-2'>
                        <Flex justify="center" className='mb-4'>
                            <Input 
                                type="number"
                                min="1"
                                value={selectedAmount}
                                onChange={handleAmountChange}
                                size="sm"
                                width="20%"
                                borderRadius={"full"}
                                borderColor={"white"}
                                textColor={"white"}
                                className='mx-2'
                            />
                            <button className='btn btn-sm rounded-full text-white font-black bg-dark_red hover:bg-light_red transition duration-300 border-white mx-2' onClick={handleDecrement}><MinusIcon/></button>
                            <button className='btn btn-sm rounded-full text-white font-black bg-dark_blue hover:bg-light_blue transition duration-300 border-white mx-2' onClick={handleIncrement}><AddIcon/></button>
                        </Flex>
                        <Flex>
                            <Link to={`/listings/${listing.id}`}>
                                <button className='btn btn-sm rounded-full border-white w-[150px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300 mx-2'>
                                    Get More Info
                                </button>
                            </Link>
                            <button className='btn btn-sm rounded-full border-white w-[130px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300 mx-2' 
                                onClick={handleAddToCart}>
                                {isAdded ? "In Cart" : "Add to Cart"}
                            </button>
                        </Flex>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    )
}
