import React, { useState } from 'react';

import './App.css';
import FileViewer from './components/FileViewer';
import Header from './components/Header';
import Footer from './components/Footer';
import ShowResults from './components/ShowResults';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { compareTexts } from './components/text-compare';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c2185b'
    }
  },
});

let allfiles = {
}

function fileViewer1CallBack(file) {
  allfiles.f1 = file;
}

function fileViewer2CallBack(file) {
  allfiles.f2 = file;
}

function App() {
  const [diff1, setDiff1] = useState([]);
  const [diff2, setDiff2] = useState([]);

  function compare() {
    let result = compareTexts(allfiles.f1, allfiles.f2);

    setDiff1(result.diff1);
    setDiff2(result.diff2);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <Box>
          <Button onClick={() => compare()} variant="contained" size="small" style={{ backgroundColor: '#CC5A71', marginBottom: 10 }}>Compare</Button>
        </Box>

        <FileViewer id='file #1' callback={fileViewer1CallBack} />
        <FileViewer id='file #2' callback={fileViewer2CallBack} />

        <Box>
          <ShowResults diff={diff1} />
          <ShowResults diff={diff2} />
        </Box>

        <Footer />
      </div >
    </ThemeProvider>
  );
}

export default App;
