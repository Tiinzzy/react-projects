import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Home from "./components/Home";
import Footer from "./components/Footer";


export function appCallBack(file) {
  console.log('>>>> APP.js >> appCallBack');
  console.log(file);
}

function callback(file) {
  console.log('>>>> APP.js');
  console.log(file);
}

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload-save-display-file" element={<FileDisplay callback={callback} />} />
          <Route path='*' element={<h3>Error</h3>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
