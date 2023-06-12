import React, { useState } from 'react';

import Typography from '@mui/material/Typography';

import Grid from './components/Grid';
import ReactTable from './components/ReactTable';
import Home from './components/Home';


function App() {
  const [pageNumber, setPageNumber] = useState(0);

  function callBack(e) {
      setPageNumber(e);
  }

  return (
    <>
      <div style={{ border: 'solid 0px red', padding: '5px 2px 0px 10px' }}>
        <Typography>Current Page: <span> {pageNumber} </span></Typography>
      </div>
      <Grid callBack={callBack} />
    </>
  );
}

export default App;
