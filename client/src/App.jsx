import React, {useState, useEffect} from 'react'
import {Routes, Route, Outlet, useNavigate, redirect} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import "./style.css"

export default function App() {
  const [user, setUser] = useState(null)
  const [showSignup, setShowSignup] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    console.log(user)
    if (user == null) {
      fetch("/api/@me")
        .then(response => {
          if (response.ok) {
            response.json().then(user => {
              setUser(user)
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
    navigate("../")
  }
  function toggleSignup() {
    setShowSignup(prev => !prev)
  }
  return (
    <div>
      <main>
        <Navbar user={user} onLogout={onLogout} toggleSignup={toggleSignup}/>
        {user != null ? (
          <Outlet context={[user, setUser]}/>
        ) : !showSignup ? (
          <Login onLogin={setUser} showSignup={showSignup}/>
        ) : (
          <SignUpForm onLogin={setUser}/>
        )}
      </main>
    </div>
  )
}


