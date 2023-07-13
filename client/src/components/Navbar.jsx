import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Navbar({user, onLogout, toggleSignup}) {
  function handleLogoutClick() {
    fetch('/api/logout', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        if (response.ok) {
          onLogout(null)
        }
      })
      .catch(error => console.log("error", error.message))
  }
  return (
    <div 
        className='navbar bg-gray-600'>
          <div className='navbar-start'>
            <div className='dropdown'>
              <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden hover:bg-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bd-base-100 rounded-box w-52'>
                <b>
                  <li>
                    <Link to="/listings">
                      Listings
                    </Link>
                  </li>
                </b>
                <b>
                  <li>
                    <Link to="/users">
                      Users
                    </Link>
                  </li>
                </b>
              </ul>
            </div>
            <Link to="/home" className='btn btn-ghost normal-case text-3xl text-white hover:bg-gray-400'>
              Stop & Shop
            </Link>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              {user ? (
                <>
                  <li>
                    <Link to="/listings" className='text-xl text-white hover:bg-gray-400'>
                      Listings
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className='text-xl text-white hover:bg-gray-400'>
                      Users
                    </Link>
                  </li>
                </>
              ) : null}
              {!user ? (
                <>
                  <li onClick={toggleSignup}>
                    <Link to="/login" className="text-xl text-white hover:bg-gray-400">
                      Login
                    </Link>
                  </li>
                  <li onClick={toggleSignup}>
                    <Link to="/signup" className="text-xl text-white hover:bg-gray-400">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                // <li onClick={handleLogoutClick}>
                //   <Link to="/login" className='text-xl text-white hover:bg-gray-400'>
                //     Logout
                //   </Link>
                // </li>
                <div></div>
              )}
            </ul>
          </div>
          {user ? (
            <div className='navbar navbar-end'>
              <div className='dropdown dropdown-end mx-4'>
                <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                  <div className="w-16 rounded-full transform transition-transform hover:scale-110">
                    <img src={"https://placekitten.com/100/100"}/>
                  </div>
                </label>
                <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
                  <b>
                    <li>
                      <Link to="/cart" className='justify-between'>
                        Cart
                      </Link>
                    </li>
                  </b>
                  <b>
                    <li>
                      <Link to="/profile" className='justify-between'>
                        Profile
                      </Link>
                    </li>
                  </b>
                  <b>
                    <li onClick={handleLogoutClick}>
                      <Link to="/login">Logout</Link>
                    </li>
                  </b>
                </ul>
              </div>
            </div>
          ) : null}
    </div>
  )
}

