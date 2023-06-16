import React, { useState } from 'react';

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
      <Grid callBack={callBack} />
    </>
  );
}

export default App;
