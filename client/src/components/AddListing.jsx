import React, {useState, useEffect, useTransition} from 'react'
import {getListings, addListing} from "../features/helpers"
import ListingCard from "./ListingCard"
import {SimpleGrid, GridItem, Button, Box} from "@chakra-ui/react";
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
                            <div className='flex flex-row justify-end mt-2'>
                                <label className='text-white mx-4' htmlFor="name"><b>Name</b></label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="p-1 rounded-full w-2/3 bg-black border-white border hover:border-dark_blue px-4 text-white"
                                />
                            </div>
                            <ErrorMessage name='name' component="div" className='flex flex-row justify-end text-white'/>
                            <div className='flex flex-row justify-end mt-6'>
                                <label className='text-white mx-4' htmlFor='quality'><b>Quality</b></label>
                                <Field
                                    type="text"
                                    name="quality"
                                    placeholder="Quality"
                                    className="p-1 rounded-full w-2/3 bg-black border-white border hover:border-dark_blue px-4 text-white"
                                />
                            </div>
                            <ErrorMessage name='quality' component="div" className='flex flex-row justify-end text-white'/>
                            <div className='flex flex-row justify-end mt-6'>
                                <label className='text-white mx-4' htmlFor='price'><b>Price</b></label>
                                <Field
                                    type="text"
                                    name="price"
                                    placeholder="Price"
                                    className="p-1 rounded-full w-2/3 bg-black border-white border hover:border-dark_blue px-4 text-white"
                                />
                            </div>
                            <ErrorMessage name='price' component="div" className='flex flex-row justify-end text-white'/>
                            <div className='flex flex-row justify-end mt-6'>
                                <label className='text-white mx-4' htmlFor='picture'><b>Picture</b></label>
                                <Field
                                    type="text"
                                    name="picture"
                                    placeholder="Picture"
                                    className="p-1 rounded-full w-2/3 bg-black border-white border hover:border-dark_blue px-4 text-white"
                                />
                            </div>
                            <ErrorMessage name='picture' component="div" className='flex flex-row justify-end text-white'/>
                            <div className='flex flex-row justify-end mt-6'>
                                <label className='text-white mx-4' htmlFor='description'><b>Description</b></label>
                                <Field
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    className="p-1 rounded-full w-2/3 bg-black border-white border hover:border-dark_blue px-4 text-white"
                                />
                            </div>
                            <ErrorMessage name='description' component="div" className='flex flex-row justify-end text-white'/>
                            <div className='flex flex-row justify-end mt-6'>
                                <label className='text-white mx-4' htmlFor='amount'><b>Amount</b></label>
                                <Field
                                    type="text"
                                    name="amount"
                                    placeholder="Amount"
                                    className="p-1 rounded-full w-2/3 bg-black border-white border hover:border-dark_blue px-4 text-white"
                                />
                            </div>
                            <ErrorMessage name='amount' component="div" className='flex flex-row justify-end text-white'/>
                            <div className='flex justify-center mt-6'>
                                <button
                                    className='btn btn-sm rounded-full justify-center border-white w-3/6 h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300 mx-2'
                                    type='submit'
                                    disabled={isSubmitting}
                                >
                                    Create Listing
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
