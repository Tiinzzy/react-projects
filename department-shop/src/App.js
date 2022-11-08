import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OrdersList from './components/OrdersList';
import DropDownMenu from './components/DropDownMenu';
import Header from './components/Header';

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
