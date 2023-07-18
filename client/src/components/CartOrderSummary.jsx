import React, {useState, useEffect} from 'react'
import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { getListingById, deleteCartedItem, addOrder, addOrderItem, getCurrentUser } from '../features/helpers'
import {redirect, useNavigate} from "react-router-dom";

const OrderSummaryItem = (props) => {
    const {label, value, children} = props
    return (
        <Flex justify="space-between" fontSize="sm">
            <Text fontWeight="medium" className='text-white'>
                {label}
            </Text>
            {value ? <Text className='text-white' fontWeight="medium">{value}</Text> : children}
        </Flex>
    )
}

export default function CartOrderSummary({cartedItemsList}) {
    const [price, setPrice] = useState(0)
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        let totalPrice = 0
        const fetchPrices = async () => {
            for (const item of cartedItemsList) {
                try {
                    const listing = await getListingById(item.listing_id)
                    totalPrice += listing.price * item.amount
                } catch (error) {
                    console.error(error)
                }
            }
            setPrice(totalPrice)
        }
        fetchPrices()
    }, [cartedItemsList])
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
                console.log(error)
            })
        }
    }, [])
    async function handleCheckout() {
        if (user) {
            try {
                const orderId = await addOrder(user.id)
                for (const item of cartedItemsList) {
                    await addOrderItem(item.listing_id, item.amount)

                }
                for (const item of cartedItemsList) {
                    await deleteCartedItem(item.id)
                }
                navigate("/home")
            } catch (error) {
                console.error(error)
            }
        } else {
            console.error(error)
        }
    }
    return (
        <Stack style={{boxShadow:"4px 6px 15px rgba(0, 0, 0, 1)"}} spacing="8" rounded="lg" padding="8" width="full" className='bg-black'>
            <Heading className='text-white text-lg'>Order Summary</Heading>
            <Stack spacing="6">
                <OrderSummaryItem label="Subtotal" value={formatPrice(price)}/>
                <OrderSummaryItem label="Shipping + Tax">
                    <Link color={"#F5F5F5"} href="#" textDecor="underline">
                        Calculate Shipping
                    </Link>
                </OrderSummaryItem>
                <OrderSummaryItem label="Coupon Code">
                    <Link color={"#F5F5F5"} href="#" textDecor="underline">
                        Add coupon code
                    </Link>
                </OrderSummaryItem>
                <Flex justify="space-between">
                    <Text className='text-white' fontSize="lg" fontWeight="semibold">
                        Total
                    </Text>
                    <Text className='text-white' fontSize="xl" fontWeight="extrabold">
                        {formatPrice(price)}
                    </Text>
                </Flex>
            </Stack>
            <button className='btn btn-sm rounded-full border-white w-full h-[50px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300 mx-2' rightIcon={<FaArrowRight />} onClick={handleCheckout}>
                Checkout
            </button>
        </Stack>
    )
}
