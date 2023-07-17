import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-screen h-screen text-white" style={{
      background: "linear-gradient(90deg, #2160D4 24%, #3D76E1 58%, #729CE9 100%)"
    }}>
      <div class="container mx-auto flex px-5 pt-20 items-center justify-center flex-col">
        <img 
          style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
          class="lg:w-2/6 md:w-3/6 w-5/6 h-[400px] rounded-3xl mb-10 object-cover object-center" 
          alt="Car Image" 
          src={"https://images.unsplash.com/photo-1597858520171-563a8e8b9925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=927&q=80"} 
        />
        <div class="text-center lg:w-5/12 w-full">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Welcome to Stop & Shop
          </h1>
          <p className="text-2xl mb-2">
            This is your one stop shop for buying and selling car parts. 
          </p>
          <p className='text-2xl mb-8'>
            Where would you like to start?
          </p>
          <div className="flex justify-center mx-auto">
            <Link to="/listings">
              <button
                style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                className="hover:underline bg-black text-white font-bold rounded-full hover:bg-gray py-4 px-8">
                View Listings
              </button>
            </Link>
            <Link to="/users">
              <button
                style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                className="ml-4 hover:underline bg-black text-white font-bold rounded-full hover:bg-gray py-4 px-8">
                View Users
              </button>
            </Link>
            <Link to="/profile">
              <button
                style={{boxShadow:"4px 5px 15px rgba(0, 0, 0, 1)"}}
                className="ml-4 hover:underline bg-black text-white font-bold rounded-full hover:bg-gray py-4 px-8">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}

