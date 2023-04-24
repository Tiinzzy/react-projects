import React, { useState, useEffect } from "react";

import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

const FOOTER_OFFSET = 185;

function getWindowSize() {
  return { h: window.innerHeight, w: window.innerWidth }
}

export default function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function resizeHandler() {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  })

  return (
    <>
      <Header />
      <div style={{ height: windowSize.h - FOOTER_OFFSET }}>
        <Home />
      </div>
      <Footer />
    </>

  );
}


