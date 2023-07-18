import React, {useState} from 'react'
import {useFormik} from "formik";
import { updateListing, deleteListing } from '../features/helpers';
import * as Yup from "yup"
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import {redirect, useNavigate} from "react-router-dom";
const ListingSchema = Yup.object().shape({
  name: Yup.string().min(1, "Name must be at least 1 character").required("Must have a name"),
  quality: Yup.string().min(1, "Quality must be at least 1 character").required("Must have a quality"),
  price: Yup.number().min(0.01, "Price must be at least 0.01").required("Must have a price"),
  picture: Yup.string().min(1, "Picture must be at least 1 character").required("Must have a picture"),
  description: Yup.string().min(1, "Description must be at least 1 character").required("Must have a description"),
  amount: Yup.number().min(1, "Amount must be at least 1 character").required("Must have an amount"),
})
export default function ListingEdit({listing, handleListingUpdate, onClose}) {
  const {name = "", quality = "", price = "", picture = "", description = "", amount = ""} = listing
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: name,
      quality: quality,
      price: price,
      picture: picture,
      description: description,
      amount: amount,
    },
    validationSchema: ListingSchema,
    onSubmit: values => {
      handleSubmit(values)
    }
  })
  function handleDelete() {
    deleteListing(listing.id).then(deleted => {
      navigate("/listings")
    })
  }
  function handleSubmit(values) {
    updateListing(listing.id, values).then(updated => {
      onClose()
      handleListingUpdate(updated)
    })
  }
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        method="post"
        className='w-full max-w-sm mx-auto bg-black rounded-md'>
        <div className='flex justify-end place-items-end'>
          <button
            size="md"
            className='btn btn-sm mt-4 mb-4 rounded-full border-white w-[155px] h-[40px] bg-dark_red text-white text-sm font-bold py-2 px-4 hover:bg-light_red transition duration-300'
            onClick={handleDelete}>
            Delete Listing
          </button>
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='block text-sm font-bold mb-2 text-white'>
            Name
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            className='w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.name ? <div className='text-white'>{formik.errors.name}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='quality' className='block text-sm font-bold mb-2 mt-4 text-white'>
            Quality
          </label>
          <Input
            id='quality'
            name='quality'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.quality}
            className='w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.quality ? <div className='text-white'>{formik.errors.quality}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='price' className='block text-sm font-bold mb-2 mt-4 text-white'>
            Price
          </label>
          <Input
            id='price'
            name='price'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.price}
            className='w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.price ? <div className='text-white'>{formik.errors.price}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='picture' className='block text-sm font-bold mb-2 mt-4 text-white'>
            Picture
          </label>
          <Input
            id='picture'
            name='picture'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.picture}
            className='w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.picture ? <div className='text-white'>{formik.errors.picture}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='description' className='block text-sm font-bold mb-2 mt-4 text-white'>
            Description
          </label>
          <Textarea 
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            size="sm"
            className='text-white'
          />
          {formik.errors.description ? (<div className='text-white'>{formik.errors.description}</div>) : null}
        </div>

        <div className='flex justify-around mt-8'>
          <button 
            className='btn btn-sm rounded-full border-white w-[125px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300'
            type='submit'>
            Save
          </button>
          <button 
            type="button"
            className='btn btn-sm rounded-full border-white w-[125px] h-[40px] bg-dark_red text-white text-sm font-bold py-2 px-4 hover:bg-light_red transition duration-300'
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
