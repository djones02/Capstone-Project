import React, {useState, useEffect, useTransition} from 'react'
import {getListings, addListing} from "../features/helpers"
import ListingCard from "./ListingCard"
import {SimpleGrid, GridItem, Button} from "@chakra-ui/react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import {redirect} from "react-router-dom";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    quality: Yup.string().required("Quality is required"),
    price: Yup.number().required("Price is required"),
    picture: Yup.string().required("Picture is required"),
    description: Yup.string().required("Description is required"),
    amount: Yup.number().required("Amount is required"),
})
export default function AddListing({onClose, addNewListing}) {
    function postListing(values) {
        addListing(values)
        .then(newListing => {
            console.log(newListing)
            onClose()
            addNewListing(newListing)
        })
        .catch(error => {
            console.error(error)
            console.log(values)
        })
    }
    return (
        <div>
            <Formik
                initialValues={{
                    name: "",
                    quality: "",
                    price: "",
                    picture: "",
                    description: "",
                    amount: "",
                }}
                validationSchema={validationSchema}
                onSubmit={postListing}>
                {({isSubmitting}) => (
                    <Form>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-end'>
                                <label htmlFor="name"><b>Name</b></label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="border-2 w-2/3"
                                />
                            </div>
                            <ErrorMessage name='name' component="div" className='flex flex-row justify-end'/>
                            <div className='flex flex-row justify-end'>
                                <label htmlFor='quality'><b>Quality</b></label>
                                <Field
                                    type="text"
                                    name="quality"
                                    placeholder="Quality"
                                    className="border-2 w-2/3"
                                />
                            </div>
                            <ErrorMessage name='quality' component="div" className='flex flex-row justify-end'/>
                            <div className='flex flex-row justify-end'>
                                <label htmlFor='price'><b>Price</b></label>
                                <Field
                                    type="text"
                                    name="price"
                                    placeholder="Price"
                                    className="border-2 w-2/3"
                                />
                            </div>
                            <ErrorMessage name='price' component="div" className='flex flex-row justify-end'/>
                            <div className='flex flex-row justify-end'>
                                <label htmlFor='picture'><b>Picture</b></label>
                                <Field
                                    type="text"
                                    name="picture"
                                    placeholder="Picture"
                                    className="border-2 w-2/3"
                                />
                            </div>
                            <ErrorMessage name='picture' component="div" className='flex flex-row justify-end'/>
                            <div className='flex flex-row justify-end'>
                                <label htmlFor='description'><b>Description</b></label>
                                <Field
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    className="border-2 w-2/3"
                                />
                            </div>
                            <ErrorMessage name='description' component="div" className='flex flex-row justify-end'/>
                            <div className='flex flex-row justify-end'>
                                <label htmlFor='amount'><b>Amount</b></label>
                                <Field
                                    type="text"
                                    name="amount"
                                    placeholder="Amount"
                                    className="border-2 w-2/3"
                                />
                            </div>
                            <ErrorMessage name='amount' component="div" className='flex flex-row justify-end'/>
                            <Button
                                type='submit'
                                disabled={isSubmitting}>Create Listing</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
