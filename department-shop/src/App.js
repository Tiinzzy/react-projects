import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


import OrdersList from './components/OrdersList';
import DropDownMenu from './components/DropDownMenu';

// import Box from '@mui/material/Box';





function Header() {
  return (<Box display='flex' mb={5}>
    <Link href="/">Home</Link>
    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
    <Link href="/add-order" >Add Order</Link>
    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
    <Link href="/list-orders" >List Orders</Link>
  </Box>);
}

export default function App() {

  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h3>HOME</h3>} />
          <Route path="/add-order" element={<DropDownMenu />} />
          <Route path="/list-orders" element={<OrdersList />} />
          <Route path='*' element={<h3>Error</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
