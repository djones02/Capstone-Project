import React, {useState, useEffect} from 'react'
import { getListingById, updateCartedItem, deleteCartedItem } from '../features/helpers'
import { CloseButton, Flex, Link, Select, useColorModeValue, Button, Input } from '@chakra-ui/react'
import CartItemMeta from './CartItemMeta'
import PriceTag from './PriceTag'
import {Navigate, redirect, useNavigate} from "react-router-dom";


export default function CartedItemCard({item}) {
    const [cartedItemData, setCartedItemData] = useState(null)
    const [selectedAmount, setSelectedAmount] = useState(item.amount);
    
    useEffect(() => {
        if (item && item.listing_id) {
            getListingById(item.listing_id)
                .then((cartedItem) => {
                    setCartedItemData(cartedItem)
                })
                .catch((error) => {
                    console.error('Error retrieving listing:', error);
                });
        }
        
    }, [item])
    if (!cartedItemData) {
        return null
    }
    function handleAmountChange(event) {
        const newAmount = Number(event.target.value)
        setSelectedAmount(newAmount);
        updateCartedItem(item.id, {amount: newAmount})
        window.location.reload()
    }
    function handleIncrement() {
        const newAmount = selectedAmount + 1
        setSelectedAmount(newAmount);
        updateCartedItem(item.id, {amount: newAmount})
        window.location.reload()
    }
    function handleDecrement() {
        if (selectedAmount > 1) {
            const newAmount = selectedAmount - 1
            setSelectedAmount(newAmount);
            updateCartedItem(item.id, {amount: newAmount})
            window.location.reload()
        }
    }
    function handleDelete() {
        deleteCartedItem(item.id)
        window.location.reload()
    }
    return (
        <Flex
            direction={{
                base: "column",
                md: "row"
            }}
            justify="space-between"
            align="center"
        >
            <CartItemMeta 
                name={cartedItemData.name}
                description={cartedItemData.description}
                picture={cartedItemData.picture}
            />
            <Flex 
                width="full"
                justify="space-between"
                display={{ base:"none", md: "flex"}}
            >
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
                <PriceTag price={cartedItemData.price} />
                <CloseButton aria-label={`Delete ${cartedItemData.name} from cart`} onClick={handleDelete}/>
            </Flex>
            <Flex
                mt="4"
                align="center"
                width="full"
                justify="space-between"
                display={{
                    base: 'flex',
                    md: 'none',
                }}
            >
                <Link fontSize="sm" textDecor="underline" onClick={handleDelete}>
                    Delete
                </Link>
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
                <PriceTag price={cartedItemData.price}/>
            </Flex>
        </Flex>
    )
}
