import React from 'react'
import {Link} from "react-router-dom"
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react"

export default function ListingCard({listing}) {
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
                    <Link to={`/listings/${listing.id}`}>
                        <Button>
                            Get More Info
                        </Button>
                    </Link>
                    <Button>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Container>
    )
}
