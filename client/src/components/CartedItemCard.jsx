import React, {useState, useEffect} from 'react'
import { getListingById, updateCartedItem, deleteCartedItem } from '../features/helpers'
import { CloseButton, Flex, Link, Select, useColorModeValue, Button, Input } from '@chakra-ui/react'
import CartItemMeta from './CartItemMeta'
import PriceTag from './PriceTag'
import {Navigate, redirect, useNavigate} from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons"

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
                    borderRadius={"full"}
                    className='text-white mx-2'
                />
                <button style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}} className='btn btn-sm rounded-full text-white font-black bg-black hover:bg-gray transition duration-300 border-none mx-2' onClick={handleDecrement}><MinusIcon/></button>
                <button style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}} className='btn btn-sm rounded-full text-white font-black bg-black hover:bg-gray transition duration-300 border-none mx-2' onClick={handleIncrement}><AddIcon/></button>
                <PriceTag price={cartedItemData.price} />
                <CloseButton className='text-white' aria-label={`Delete ${cartedItemData.name} from cart`} onClick={handleDelete}/>
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
                <CloseButton className='text-white' aria-label={`Delete ${cartedItemData.name} from cart`} onClick={handleDelete}/>
                <Input 
                    type="number"
                    min="1"
                    value={selectedAmount}
                    onChange={handleAmountChange}
                    size="sm"
                    width="15%"
                    className='text-white'
                    borderRadius={"full"}
                />
                <button style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}} className='btn btn-sm rounded-full text-white font-black bg-black hover:bg-gray transition duration-300 border-none mx-2' onClick={handleDecrement}><MinusIcon/></button>
                <button style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}} className='btn btn-sm rounded-full text-white font-black bg-black hover:bg-gray transition duration-300 border-none mx-2' onClick={handleIncrement}><AddIcon/></button>
                <PriceTag price={cartedItemData.price}/>
            </Flex>
        </Flex>
    )
}
