import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav 
        className='navbar bg-gray-600'>
        <Link to="/home">Stop & Shop</Link>
        <Link to="/listings">Listings</Link>
        <Link to="/users">Users</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
    </nav>
  )
}

