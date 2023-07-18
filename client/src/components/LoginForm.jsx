import React, {useState} from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Textarea,
    Text
} from "@chakra-ui/react"
import {redirect, useNavigate, Link} from "react-router-dom"

export default function LoginForm({onLogin}) {
    const [loginForm, setLoginForm] = useState({email: "", password: ""})
    const [errors, setErrors] = useState([])
    const [display, setDisplay] = React.useState(false)
    const handleClick = () => setDisplay(prev => !prev)
    const navigate = useNavigate()
    function handleChange(event) {
        const name = event.target.name
        let value = event.target.value
        setLoginForm({...loginForm, [name]: value})
    }
    function handleSubmit(event) {
        event.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginForm)
        })
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    response.json().then(currentUser => {
                        console.log(currentUser)
                        // onLogin(currentUser)
                        navigate("/home")
                        window.location.reload()
                    })
                } else {
                    console.log("login failed")
                }
            })
            .catch(error => setErrors(error.errors))
    }

    return (
        <div className='mt-20 rounded-md' style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}>
        <form
            onSubmit={event => handleSubmit(event)}
            className='1-full max-w-sm mx-auto bg-black p-8 rounded-md shadow-md'>
            <p className='text-white text-3xl text-center mb-4'>Log In</p>
            <div className='mt-2'>
                <label
                    className='block text-sm text-white font-bold mb-2'
                    htmlFor='email'>
                    Email
                </label>
                <Input 
                    id="email"
                    name='email'
                    type="text"
                    onChange={handleChange}
                    value={loginForm.email}
                    placeholder='Enter Email'
                    autoComplete='email'
                    color={"white"}
                    borderRadius={"full"}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md hover:outline-dark_blue '
                />
            </div>
            <div className='mt-4'>
                <label 
                    className='block text-sm text-white font-bold mb-2'
                    htmlFor='password'>
                    Password
                </label>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={display? "text" : "password"}
                        placeholder='Enter password'
                        value={loginForm.password}
                        onChange={handleChange}
                        name="password"
                        id='password'
                        color={"white"}
                        borderRadius={"full"}
                        autoComplete="current-password"
                        className='hover:outline-dark_blue'
                    />
                    <InputRightElement width="4.5rem">
                        <button 
                            type="button"
                            className="btn btn-sm h-[40px] w-[74px] rounded-full bg-dark_blue text-white hover:bg-light_blue"
                            onClick={handleClick}>
                            {display ? "Hide" : "Show"}
                        </button>
                    </InputRightElement>
                </InputGroup>
            </div>
            <div className='flex justify-around mt-8'>
                <button
                    className='btn btn-sm rounded-full border-white w-[125px] h-[40px] bg-dark_blue text-white text-sm font-bold py-2 px-4 hover:bg-light_blue transition duration-300'
                    type="submit">
                    Login
                </button>
            </div>
        </form>
        </div>
    )
}
