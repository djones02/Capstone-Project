import React, {useState} from 'react'
import {
  useNavigate,
  useNavigation,
  // useActionData,
  useSubmit,
  redirect,
} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { createUser } from '../features/helpers';
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
YupPassword(Yup)
const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().password().required("Password must contain 8 characters with >= lowercase, >=1 uppercase, >=1number, >=1 symbol")
})
export const action = async ({request}) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData)
  console.log(values)
  try {
    console.log("hello")
    const newUser = await createUser(values)
    return redirect("/profile")
  } catch (error) {
    return {error: "Error creating new user"}
  }
}
export default function Signup({onLogin, toggleShowLogin}) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(prev => !prev)
  // const actionData = useActionData()
  // const {error} = actionData || {}
  const navigate = useNavigate()
  // const navigation = useNavigation()
  // const submit = useSubmit()
  function handleSubmit(values) {
    fetch("/api/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(newUser => {
      onLogin(newUser)
      navigate("/profile")
    })
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      pfp: "",
    },
    validationSchema: ProfileSchema,
    onSubmit: async values => {
      console.log(values)
      handleSubmit(values)
    }
  })
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        method='post'
        className='w-full max-w-sm mx-auto bg-gray-600 p-8 rounded-md shadow-md'
      >
        <div className='mb-2'>
          <label htmlFor='firstName' className='block text-sm font-bold mb-2'>
            Name
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='email' className='block text-sm font-bold mb-2'>
            Email
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='password' className='block text-sm font-bold mb-2'>
            Password
          </label>
          <InputGroup>
            <Input
              pr="4.5rem"
              id='password'
              name='password'
              type={show ? "text" : "password"}
              placeholder='Enter Password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <InputRightElement width="4.5rem">
              <Button
                size="md"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div className='mb-2'>
          <label htmlFor='profilePicture' className='block text-sm font-bold mb-2'>
            Profile Picture
          </label>
          <Input
            id='profilePicture'
            name='profilePicture'
            type='file'
            onChange={event =>
              formik.setFieldValue(
                "pfp",
                URL.createObjectURL(event.currentTarget.files[0])
              )
            }
            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-white focus:outline-none focus:border-transparent text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:bg-indigo-600 file:text-white file:rounded-md"
          />
          {formik.errors.pfp ? <div>{formik.errors.pfp}</div> : null}
        </div>
        <div className='flex justify-around'>
          <Button 
            className='w-[125px] bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-400 transition duration-300'
            type='submit'
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" && <Spinner />}
            Save
          </Button>
          <Button
            type='button'
            onClick={toggleShowLogin}
            className='w-[125px] bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-red-400 transition duration-300'
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

