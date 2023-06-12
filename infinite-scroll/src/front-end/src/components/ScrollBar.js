import React, { useState } from 'react';

import Tooltip from '@mui/material/Tooltip';

import './style.css';

export default function ScrollBar({ height, totalPages, currentPage, callParent }) {
    const [pageHover, setPageHover] = useState(0);
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

    var marginTop = height / totalPages * currentPage;

    const jumpToPage = (e) => {
        let pageNo = Math.floor(totalPages * (e.clientY - 10) / height);
        pageNo = (pageNo > totalPages ? totalPages : pageNo);
        pageNo = (pageNo < 0 ? 0 : pageNo);
        callParent(pageNo);
    }


    const handlePageSuggestions = (e) => {
        setPageHover(Math.floor(totalPages * (e.clientY - 10) / height));
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <Tooltip arrow placement="left-start"
            open={tooltipPosition.x !== 0 && tooltipPosition.y !== 0}
            PopperProps={{ style: { transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)`, }, }}
            title={'Jump to Page #' + pageHover}>

            <div id='page-scroll' className="scroll-container" style={{ height: height + 10 }}
                onMouseMove={handlePageSuggestions}
                onMouseLeave={() => { setTooltipPosition(0) }}
                onClick={(e) => jumpToPage(e)}>
                <Tooltip title={'Page #' + currentPage}>
                    <div id='page-scroll' className="scroll-bar" style={{ marginTop }}>{currentPage}</div>
                </Tooltip >
            </div >
        </ Tooltip >
    )
};