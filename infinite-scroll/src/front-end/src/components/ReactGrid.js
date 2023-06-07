import React from 'react';
import { Grid } from 'react-virtualized';

import 'react-virtualized/styles.css';
import './style.css'

const ArrayGrid = ({ arrayOfArrays }) => {
    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        const row = arrayOfArrays[rowIndex];
        return (
            <div key={key} style={style} className='row-styling'>
                <span style={{ display: 'inline-block', width: 350, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[0]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 90, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[1]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 90, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[2]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 500, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[3].substr(0, 60) + ' ...'}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 30, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[4]}</span>
            </div>
        );
    };

    return (
        <Grid
            style={{ borderBottom: 'solid 1px #eaeaea' }}
            cellRenderer={cellRenderer}
            columnCount={1}
            columnWidth={1300}
            rowCount={arrayOfArrays.length}
            rowHeight={30}
            height={950}
            width={1350}
        />
    );
};

export default ArrayGrid;