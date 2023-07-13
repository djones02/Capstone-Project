import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  // You can include any additional layout elements or logic here
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;