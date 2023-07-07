import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Listings from './pages/Listings.jsx'
import ListingById from './pages/ListingById.jsx'
import Users from './pages/Users.jsx'
import UserById from './pages/UserById.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/login' index element={<Login />} />
        <Route path='/signup' index element={<Signup />} />
        <Route path='/profile' index element={<Profile />} />
        <Route path='/listings' index element={<Listings />} />
        <Route path='/listing/:id' index element={<ListingById />} />
        <Route path='/users' index element={<Users />} />
        <Route path='/user/:id' index element={<UserById />} />
        <Route path='/cart' index element={<Cart />} />
        <Route path='/orders' index element={<Orders />} />
      </Routes>
    </div>
  )
}


