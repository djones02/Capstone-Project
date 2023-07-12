import {useState, useEffect} from 'react';
import {Divider, Button} from '@chakra-ui/react';
import LoginForm from "../components/LoginForm";

export default function Login({onLogin}) {
  const [showLogin, setShowLogin] = useState(true)
  function toggleShowLogin(){
    setShowLogin(prev => !prev)
  }
  return (
    <div>
        <LoginForm onLogin={onLogin}/>
    </div>
  )
}

