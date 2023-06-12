import React, { useState } from 'react';

import Tooltip from '@mui/material/Tooltip';

import './style.css';

export default function ScrollBar({ height, totalPages, currentPage, callParent }) {
    const [pageHover, setPageHover] = useState(0);

    var marginTop = height / totalPages * currentPage;

    const jumpToPage = (e) => {
        let pageNo = Math.floor(totalPages * (e.clientY - 10) / height);
        pageNo = (pageNo > totalPages ? totalPages : pageNo);
        pageNo = (pageNo < 0 ? 0 : pageNo);
        callParent(pageNo);
    }

    return (
        <Tooltip title={'Jump to Page #' + pageHover} arrow>
            <div id='page-scroll' className="scroll-container" style={{ height: height + 10 }}
                onMouseMove={(e) => { setPageHover(Math.floor(totalPages * (e.clientY - 10) / height)) }}
                onClick={(e) => jumpToPage(e)}>
                <Tooltip title={'Page #' + currentPage}>
                    <div id='page-scroll' className="scroll-bar" style={{ marginTop }}>{currentPage}</div>
                </Tooltip >
            </div >
        </Tooltip >
    )
};