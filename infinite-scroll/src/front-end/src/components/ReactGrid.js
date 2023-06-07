import React from 'react';
import { Grid } from 'react-virtualized';

import 'react-virtualized/styles.css'; 

const ArrayGrid = ({ arrayOfArrays }) => {
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const value = arrayOfArrays[rowIndex][columnIndex];
    return (
      <div key={key} style={style}>
        {value}
      </div>
    );
  };

  return (
    <Grid
      cellRenderer={cellRenderer}
      columnCount={arrayOfArrays[0].length}
      columnWidth={900} // Width of each column
      rowCount={arrayOfArrays.length}
      rowHeight={60} 
      height={1000} 
      width={1000} 
    />
  );
};

export default ArrayGrid;