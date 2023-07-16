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
            className='flex flex-col justify-center items-center bg-gray-500'>
            <LoginForm onLogin={onLogin} />
            <Divider className='my-4'/>
            <p>
              Need an account? &nbsp;
              <Button
                onClick={() => setShowLogin(false)}>
                Sign Up
              </Button>
            </p>
          </div>
        ) : (
          <div
            className='flex flex-col justify-center items-center bg-gray-300'>
            <SignUp onLogin={onLogin} toggleShowLogin={toggleShowLogin}/>
            <Divider className='my-4'/>
            <p>
              Already have an account? &nbsp;
              <Button
                onClick={() => setShowLogin(true)}>
                Log In
              </Button>
            </p>
          </div>
        )}
    </div>
  )
}

