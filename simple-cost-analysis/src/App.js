import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisplayGrid from './components/DisplayGrid';
import Header from './components/Header';
import SaveFile from './components/SaveFile';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-save-file" element={<SaveFile />} />
          <Route path="/display-grid" element={<DisplayGrid />} />
          {/* <Route path='*' element={<h3>Error</h3>} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
