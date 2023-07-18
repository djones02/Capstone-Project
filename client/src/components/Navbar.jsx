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
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: '9999' }}
        className='navbar bg-black p-0'>
          <div className='navbar-start'>
            {user ? (
              <div className='dropdown'>
                <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden hover:bg-gray">
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
                  className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bd-base-100 rounded-box w-52 bg-white'>
                  <b>
                    <li >
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
            ) : null}
            <Link to="/home" className='btn btn-ghost normal-case text-3xl text-white hover:bg-gray'>
              Stop & Shop
            </Link>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              {user ? (
                <>
                  <li>
                    <Link style={{color: "white"}} to="/listings" className='text-xl text-white hover:bg-gray'>
                      Listings
                    </Link>
                  </li>
                  <li>
                    <Link style={{color: "white"}} to="/users" className='text-xl text-white hover:bg-gray '>
                      Users
                    </Link>
                  </li>
                </>
              ) : null}
              {!user ? (
                <>
                  {/* <li onClick={toggleSignup}>
                    <Link style={{color: "white"}} to="/login" className="text-xl text-white hover:bg-gray">
                      Login
                    </Link>
                  </li>
                  <li onClick={toggleSignup}>
                    <Link style={{color: "white"}} to="/signup" className="text-xl text-white hover:bg-gray">
                      Signup
                    </Link>
                  </li> */}
                </>
              ) : (
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

