import React from 'react';
import { Grid } from 'react-virtualized';

import 'react-virtualized/styles.css';

const ArrayGrid = ({ arrayOfArrays }) => {
    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        const row = arrayOfArrays[rowIndex];
        console.log(row)
        return (
            <div key={key} style={style} className='row-styling'>
                <span style={{ display: 'inline-block', width: 350, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[0]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 90, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[1]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 90, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[2]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 500, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[3].substr(0, 60) + ' ...'}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 30, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[4]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 350, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[5]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 50, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[6]}</span>
                <span style={{ marginLeft: 20, display: 'inline-block', width: 50, borderBottom: 'solid 1px gray', marginBottom: 20 }}>{row[7]}</span>
            </div>
        );
    };

    return (
        <Grid
            style={{ borderBottom: 'solid 1px #eaeaea' }}
            cellRenderer={cellRenderer}
            columnCount={1}
            columnWidth={2000}
            rowCount={arrayOfArrays.length}
            rowHeight={30}
            height={950}
            width={2000}
        />
    );
};

export default ArrayGrid;