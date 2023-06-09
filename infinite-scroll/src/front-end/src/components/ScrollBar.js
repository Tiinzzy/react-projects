import React from 'react';

export default function ScrollBar({ height, totalPages, currentPage }) {
    const marginTop = height / totalPages * currentPage;
    return (
        <div style={{ height, width: 20, background: '#eaeaea' }}>
            <div draggable={true}
                style={{ marginTop, height: 5, background: 'dodgerblue' }}></div>
        </div>
    )

};