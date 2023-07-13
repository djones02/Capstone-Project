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
export default function ListingEdit({listing, handleListingUpdate, toggleShowEdit}) {
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
      toggleShowEdit()
      handleListingUpdate(updated)
    })
  }
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        method="post"
        className='w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md'>
        <div className='flex justify-end place-items-end'>
          <Button
            size="md"
            onClick={handleDelete}>
            Delete Listing
          </Button>
        </div>
        <div className='mb-2'>
          <label htmlFor='name' className='block text-sm font-bold mb-2'>
            Name
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='quality' className='block text-sm font-bold mb-2'>
            Quality
          </label>
          <Input
            id='quality'
            name='quality'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.quality}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.quality ? <div>{formik.errors.quality}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='price' className='block text-sm font-bold mb-2'>
            Price
          </label>
          <Input
            id='price'
            name='price'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.price}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.price ? <div>{formik.errors.price}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='picture' className='block text-sm font-bold mb-2'>
            Picture
          </label>
          <Input
            id='picture'
            name='picture'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.picture}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600'
          />
          {formik.errors.picture ? <div>{formik.errors.picture}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='description' className='block text-sm font-bold mb-2'>
            Description
          </label>
          <Textarea 
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            size="sm"
          />
          {formik.errors.description ? (<div>{formik.errors.description}</div>) : null}
        </div>

        <div className='flex justify-around'>
          <button 
            className='w-[125px] bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-400 transition duration-300'
            type='submit'>
            Save
          </button>
          <button 
            type="button"
            className='w-[125px] bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-400 transition duration-300'
            onClick={toggleShowEdit}>
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
