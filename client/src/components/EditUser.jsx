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

export default function EditUser({user, toggleShowForm}) {
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
      .then(toggleShowForm())
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
        <Button
          size="md"
          onClick={handleDelete}
        >
          Delete Profile
        </Button>
      </div>
      <div className="mb-2">
        <label
          htmlFor="firstName"
          className="block text-sm font-bold mb-2">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          style={{borderWidth:"2px",}}
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      <div className="mb-2">
        <label
          htmlFor="email"
          className="block text-sm font-bold mb-2">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          style={{borderWidth:"2px",}}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div className="mb-2">
        <label
          htmlFor="profilePicture"
          className="block text-sm font-bold mb-2">
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
          className="block w-full cursor-pointer bg-gray-50 border border-gray-300 focus:outline-none focus:border-transparent text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:bg-indigo-600 file:text-white file:rounded-md"
        />
        {formik.errors.pfp ? (
          <div>{formik.errors.pfp}</div>
        ) : null}
      </div>
      <div className="flex justify-around" style={{marginTop:"20px"}}>
        <button
          className="w-[125px] bg-playstation_blue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_blue transition duration-300"
          type="submit"
          disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" && <Spinner />}
          Save
        </button>
        <button
          type="button"
          onClick={toggleShowForm}
          style={{marginLeft:"20px"}}
          className="w-[125px] bg-tomato text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_red transition duration-300">
          Cancel
        </button>
      </div>
    </form>
  )
}
