import React, { useState, useEffect } from 'react';

import Home from "./components/Home";
import Header from "./components/Header";

import { styleEventEmitter } from './components/Header';

import './components/style.css';

function App() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    styleEventEmitter.on('settingStyle', (data) => {
      setTheme(data.className);
    })
  }, []);

  return (
    <>
      <Header />
      <div className={theme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '65%' }}>
          <Home />
        </div>
      </div>
    </>

  );
}

export default App;
