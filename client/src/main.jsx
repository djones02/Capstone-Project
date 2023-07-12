import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import './style.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Listings from './pages/Listings.jsx'
import ListingById from './pages/ListingById.jsx'
import Users from './pages/Users.jsx'
import UserById from './pages/UserById.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/home' index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listing/:id' element={<ListingById />} />
          <Route path='/users' element={<Users />} />
          <Route path='/user/:id' element={<UserById />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
