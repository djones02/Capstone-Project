import React, {useState} from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Textarea,
    Text
} from "@chakra-ui/react"
import {redirect, useNavigate} from "react-router-dom"

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
                if (response.status === 200) {
                    response.json().then(user => {
                        console.log(user)
                        onLogin(user)
                        navigate("../home")
                    })
                }
            })
            .catch(error => setErrors(error.errors))
    }

    return (
        <form
            onSubmit={event => handleSubmit(event)}
            className='1-full max-w-sm mx-auto bg-gray-600 p-8 rounded-md shadow-md'>
            <div className='mb-4'>
                <label
                    className='block text-sm font-bold mb-2'
                    htmlFor='email'>
                    Email
                </label>
                <Input 
                    id="email"
                    name='email'
                    type="text"
                    onChange={handleChange}
                    value={loginForm.email}
                    autoComplete='email'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                />
            </div>
            <div className='mb-4'>
                <label 
                    className='block text-sm font-bold mb-2'
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
                        autoComplete="current-password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button 
                            size="md"
                            onClick={handleClick}>
                            {display ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </div>
            <div className='flex justify-around'>
                <button
                    className='w-[125px] bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-800 transition duration-300'
                    type="submit">
                    Login
                </button>
            </div>
        </form>
    )
}
