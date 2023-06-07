import React from 'react';
import { Grid } from 'react-virtualized';

import 'react-virtualized/styles.css';
import './style.css'

const ArrayGrid = ({ arrayOfArrays }) => {
    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        const value = arrayOfArrays[rowIndex][columnIndex];
        return (
            <div key={key} style={style} className='row-styling'>
                {value}
            </div>
        );
    };

    return (
        <Grid
            cellRenderer={cellRenderer}
            columnCount={arrayOfArrays[0].length}
            columnWidth={900}
            rowCount={arrayOfArrays.length}
            rowHeight={120}
            height={950}
            width={1350}
        />
    );
};

export default ArrayGrid;