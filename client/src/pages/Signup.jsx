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
  password: Yup.string().password().required("Password must contain 8 characters with at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol")
})
export const action = async ({request}) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData)
  console.log(values)
  try {
    console.log("hello")
    const newUser = await createUser(values)
    // return redirect("/profile")
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
      // onLogin(newUser)
      navigate("../home")
      window.location.reload()
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
    <div className='mt-20 rounded-md' style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}>
      <form
        onSubmit={formik.handleSubmit}
        method='post'
        className='w-full max-w-sm mx-auto bg-black p-8 rounded-md shadow-md'
      >
        <p className='text-white text-3xl text-center mb-4'>Sign Up</p>
        <div className='mb-2'>
          <label style={{color: "white"}} htmlFor='firstName' className='block text-sm font-bold mb-2'>
            Name
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Enter Name'
            onChange={formik.handleChange}
            value={formik.values.name}
            color={"white"}
            borderRadius={"full"}
            _hover={{borderColor:"#2B6ADE"}}
            className='w-full'
          />
          {formik.errors.name ? <div className='text-white'>{formik.errors.name}</div> : null}
        </div>
        <div className='mb-2'>
          <label style={{color: "white"}} htmlFor='email' className='block text-sm font-bold mb-2'>
            Email
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Enter Email'
            onChange={formik.handleChange}
            value={formik.values.email}
            color={"white"}
            borderRadius={"full"}
            _hover={{borderColor:"#2B6ADE"}}
            className='w-full'
          />
          {formik.errors.email ? <div className='text-white'>{formik.errors.email}</div> : null}
        </div>
        <div className='mb-2 pt-2'>
          <label style={{color: "white"}} htmlFor='password' className='block text-sm font-bold mb-2'>
            Password
          </label>
          <InputGroup className="border-white hover:outline-dark_blue">
            <Input
              pr="4.5rem"
              id='password'
              name='password'
              type={show ? "text" : "password"}
              placeholder='Enter Password'
              onChange={formik.handleChange}
              value={formik.values.password}
              color={"white"}
              borderRadius={"full"}
              _hover={{borderColor:"#2B6ADE"}}
              className="w-full"
            />
            <InputRightElement width="4.5rem">
              <button
                size="md"
                onClick={handleClick}
                type='button'
                className="btn btn-sm h-[40px] w-[74px] bg-dark_blue rounded-full text-white hover:bg-light_blue"
              >
                {show ? "Hide" : "Show"}
              </button>
            </InputRightElement>
          </InputGroup>
          {formik.errors.password ? <div className='text-white'>{formik.errors.password}</div> : null}
        </div>
        <div className='mb-2 pt-2'>
          <label style={{color: "white"}} htmlFor='profilePicture' className='block text-sm font-bold mb-2'>
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
            paddingInlineStart={"none"}
            paddingInlineEnd={"none"}
            borderRadius={"full"}
            _hover={{borderColor:"#2B6ADE"}}
            className="block w-full cursor-pointer bg-gray border-white text-white file:mr-4 file:py-2 file:px-4 file:bg-dark_blue file:text-white file:border-none file:rounded-full file:h-[39px]"
          />
          {formik.errors.pfp ? <div>{formik.errors.pfp}</div> : null}
        </div>
        <div className='flex justify-around pt-4'>
          <button
            type='button'
            onClick={toggleShowLogin}
            className='btn btn-sm rounded-full border-white w-[125px] h-[40px] bg-dark_red text-white text-sm font-bold py-2 px-4 hover:bg-light_red transition duration-300'
          >
            Cancel
          </button>
          <button 
            className='btn btn-sm rounded-full border-white w-[125px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300'
            type='submit'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

