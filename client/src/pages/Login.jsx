import {useState, useEffect} from 'react';
import {Divider, Button} from '@chakra-ui/react';
import LoginForm from "../components/LoginForm";
import SignUp from './Signup';
import { useNavigate } from 'react-router-dom';

export default function Login({onLogin}) {
  const [showLogin, setShowLogin] = useState(true)
  const navigate = useNavigate()
  function toggleShowLogin(){
    setShowLogin(prev => !prev)
  }
  return (
    <div>
        {showLogin ? (
          <div
            className='flex flex-col justify-center items-center pt-16'>
            <LoginForm onLogin={onLogin} />
            <Divider borderColor={"white"} className='my-4 py-6'/>
            <p className='py-4'>
              <b className='text-white'>Need an account? &nbsp;</b>
              <button
                style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                className='mx-2 w-[100px] h-[40px] border-none btn btn-sm bg-black hover:bg-gray text-white rounded-full'
                onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div
            className='flex flex-col justify-center items-center pt-16'>
            <SignUp onLogin={onLogin} toggleShowLogin={toggleShowLogin}/>
            <Divider borderColor={"white"} className='my-4 py-6'/>
            <p className='py-4'>
              <b className='text-white'>Already have an account? &nbsp;</b>
              <button
                style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                className='mx-2 w-[100px] h-[40px] border-none btn btn-sm bg-black hover:bg-gray text-white rounded-full'
                onClick={() => setShowLogin(true)}>
                Log In
              </button>
            </p>
          </div>
        )}
    </div>
  )
}

