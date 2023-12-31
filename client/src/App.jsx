import React, {useState, useEffect} from 'react'
import {Routes, Route, Outlet, useNavigate, redirect} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Footer from './components/Footer.jsx'
import "./style.css"

export default function App() {
  const [user, setUser] = useState(null)
  const [showSignup, setShowSignup] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (user == null) {
      fetch("/api/@me")
        .then(response => {
          if (response.ok) {
            response.json().then(user => {
              setUser(user)
              // console.log(user)
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])
  function onLogout(loggedOut) {
    setUser(null)
    // navigate("../")
  }
  function toggleSignup() {
    setShowSignup(prev => !prev)
  }
  function handleLogin(loginUser) {
    console.log(loginUser)
    setUser(loginUser)
  }
  return (
    <div>
      <main 
        style={{
          background: "linear-gradient(90deg, #2160D4 24%, #3D76E1 58%, #729CE9 100%)"
        }}
        className='min-h-screen'>
        <Navbar user={user} onLogout={onLogout} toggleSignup={toggleSignup}/>
        {user != null ? (
          <Outlet context={[user, setUser]}/>
        ) : !showSignup ? (
          <Login onLogin={handleLogin} showSignup={showSignup}/>
        ) : (
          <SignUp onLogin={handleLogin}/>
        )}
        <Footer user={user}/>
      </main>
    </div>
  )
}


