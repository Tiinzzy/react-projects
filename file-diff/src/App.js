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


function cleanDiff(diff) {
  let clean = [];
  for (let i = 0; i < diff.length; i++) {
    for (let j = 0; j < diff[i].length; j++) {
      if (typeof diff[j] !== 'undefined' && diff[j] !== null && diff[j].length > 0) {
        clean.push(diff[j]);
      }
    }
  }
  return clean;
}

function App() {
  const [diff1, setDiff1] = useState([]);
  const [diff2, setDiff2] = useState([]);
  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);

  function compare() {
    let result = compareTexts(allfiles.f1, allfiles.f2);
    setDiff1(cleanDiff(result.diff1));
    setDiff2(cleanDiff(result.diff2));
    setText1(allfiles.f1);
    setText2(allfiles.f2);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <Box>
          <Button onClick={() => compare()} variant="contained" size="small" style={{ backgroundColor: '#CC5A71', marginBottom: 10 }}>Compare</Button>
        </Box>

        <table width='100%'>
          <tbody>
            <tr valign='top'>
              <td width='50%'>
                <FileViewer id='file #1' callback={fileViewer1CallBack} />
                <ShowResults diff={diff1} text={text1} />
              </td>

              <td width='50%'>
                <FileViewer id='file #2' callback={fileViewer2CallBack} />
                <ShowResults diff={diff2} text={text2} />
              </td>
            </tr>
          </tbody>
        </table>

        <Footer />
      </div >
    </ThemeProvider>
  );
}

export default App;
