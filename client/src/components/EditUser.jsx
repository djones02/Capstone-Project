import React, {useEffect, useState} from 'react'
import { getUserById, updateUser, deleteUser } from '../features/helpers'
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useActionData,
  useSubmit,
  redirect,
  useOutletContext,
} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import YupPassword from 'yup-password';
import {Input, Textarea, Spinner, Button} from "@chakra-ui/react";
YupPassword(Yup);
const EditUserSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email().required("Email is Required"),
})

export default function EditUser({user, onClose, handleUserUpdate}) {
  const [userData, setUserData] = useState()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(user)
  function handleDelete() {
    deleteUser(currentUser.id)
      .then(deleted => {
        fetch('/api/logout', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
        })
        .catch(error => console.error(error))
        navigate("/login")
      })
  }
  function handleSubmit(id, values) {
    updateUser(id, values)
      .then(onClose())
      .then(updated => {
        console.log(updated)
        setCurrentUser(updated)
        window.location.reload()
      })
  }
  const formik = useFormik({
    initialValues: {
      name: currentUser.name,
      email: currentUser.email,
      pfp: currentUser.pfp || ""
    },
    validationSchema: EditUserSchema,
    onSubmit: async values => {
      handleSubmit(currentUser.id, values)
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex justify-end place-items-end'>
        <button
          size="md"
          type='button'
          onClick={handleDelete}
          className='btn btn-sm mb-4 rounded-full border-white w-[155px] h-[40px] bg-dark_red text-white text-sm font-bold py-2 px-4 hover:bg-light_red transition duration-300'>
          Delete Profile
        </button>
      </div>
      <div className="mb-2">
        <label
          htmlFor="firstName"
          className="block text-sm text-white font-bold mb-2">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          style={{borderWidth:"2px",}}
          onChange={formik.handleChange}
          value={formik.values.name}
          borderRadius={"full"}
          className="w-full text-white px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.name ? <div className='text-white'>{formik.errors.name}</div> : null}
      </div>
      <div className="mb-2 mt-4">
        <label
          htmlFor="email"
          className="block text-white text-sm font-bold mb-2">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          style={{borderWidth:"2px",}}
          onChange={formik.handleChange}
          value={formik.values.email}
          borderRadius={"full"}
          className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.email ? <div className='text-white'>{formik.errors.email}</div> : null}
      </div>
      <div className="mb-2 mt-4">
        <label
          htmlFor="profilePicture"
          className="block text-white text-sm font-bold mb-2">
          Image
        </label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          style={{borderWidth:"2px",}}
          onChange={event =>
            formik.setFieldValue(
              "pfp",
              URL.createObjectURL(event.currentTarget.files[0]),
            )
          }
          className="block text-white w-full cursor-pointer bg-gray-50 border border-gray-300 focus:outline-none focus:border-transparent text-sm rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-dark_blue file:text-white file:rounded-md file:border-none"
        />
        {formik.errors.pfp ? (
          <div className='text-white'>{formik.errors.pfp}</div>
        ) : null}
      </div>
      <div className='flex justify-center mt-8'>
          <button 
            className='btn btn-sm mx-6 rounded-full border-white w-[125px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300'
            type='submit'>
            Save
          </button>
          <button 
            type="button"
            className='btn btn-sm mx-6 rounded-full border-white w-[125px] h-[40px] bg-dark_red text-white text-sm font-bold py-2 px-4 hover:bg-light_red transition duration-300'
            onClick={onClose}>
            Cancel
          </button>
        </div>
    </form>
  )
}
