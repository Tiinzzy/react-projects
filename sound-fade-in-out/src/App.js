import React, { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from "./components/Home";
import Header from "./components/Header";

import { styleEventEmitter } from './components/Header';

import './components/style.css';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1769aa'
    },
    secondary: {
      main: '#FDB813',
    },
    tertiary: {
      main: '#0D7EE9'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#2E2E2E'
    },
    secondary: {
      main: '#CCCCCC',
    },
    tertiary: {
      main: '#7B7676'
    }
  }
});


function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    styleEventEmitter.on('settingStyle', (data) => {
      setTheme(data.className);
    })
  }, []);

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Header />
        <div className={theme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '65%' }}>
            <Home />
          </div>
        </div>
      </ThemeProvider>
    </>

  );
}

export default App;
