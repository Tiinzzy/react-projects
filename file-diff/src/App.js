import React, { useState } from 'react';

import './App.css';
import FileViewer from './components/FileViewer';
import Header from './components/Header';
import Footer from './components/Footer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { compareTexts } from './components/text-compare';

let allfiles = {
}

function fileViewer1CallBack(file) {
  allfiles.f1 = file;
}

function fileViewer2CallBack(file) {
  allfiles.f2 = file;
}

function ShowResult(props) {
  return (<>
    <div style={{ padding: 10, border: 'solid 1px gray', margin: 10}}>
      {JSON.stringify(props.diff)}
    </div>
  </>);
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
    <div className="App">
      <Header />

      <Box>
        <Button onClick={() => compare()} variant="outlined" size="small">Compare</Button>
      </Box>

      <FileViewer id='file #1' callback={fileViewer1CallBack} />
      <FileViewer id='file #2' callback={fileViewer2CallBack} />

      <ShowResult diff={diff1} />
      <ShowResult diff={diff2} />

      <Footer />
    </div>
  );
}

export default App;
