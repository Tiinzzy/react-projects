import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OrdersList from './components/OrdersList';
import DropDownMenu from './components/DropDownMenu';
import Header from './components/Header';
import Home from './components/Home';

export default function App() {

  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-order" element={<DropDownMenu />} />
          <Route path="/list-orders" element={<OrdersList />} />
          <Route path='*' element={<h3>Error</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
