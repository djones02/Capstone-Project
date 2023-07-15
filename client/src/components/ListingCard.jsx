import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { Container, Box, Button, Image, FormControl, Input, InputGroup, InputRightAddon, Flex } from "@chakra-ui/react"
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
        <Container className='px-4' p="2">
            <div className='card max-w-48 bg-base-100 shadow-xl bg-gray-600'>
                <figure className='px-0 pt-7 object-contain'>
                    <Image 
                        src={listing.picture}
                        alt={listing.name}
                        maxWidth="200px"
                        objectFit="align"
                        maxHeight={375}
                        className='rounded-xl'
                    />
                </figure>
                
                <div className='card-body items-center text-center'>
                    <h2 className='card-title text-2xl'>{listing.name}</h2>
                    <div className='text=bold text-xl'>
                        Price: ${listing.price}
                    </div>
                </div>
                <div className='card-actions'>
                    <Flex justify="center">
                        <Input 
                            type="number"
                            min="1"
                            value={selectedAmount}
                            onChange={handleAmountChange}
                            size="sm"
                            width="20%"
                        />
                        <Button onClick={handleDecrement}>-</Button>
                        <Button onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Flex>
                        <Link to={`/listings/${listing.id}`}>
                            <Button>
                                Get More Info
                            </Button>
                        </Link>
                        <Button onClick={handleAddToCart}>
                            {isAdded ? "In Cart" : "Add to Cart"}
                        </Button>
                    </Flex>
                </div>
            </div>
        </Container>
    )
}
