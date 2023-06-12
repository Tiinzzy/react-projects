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

    const positionRef = React.useRef({
        x: 0,
        y: 0,
    });
    const popperRef = React.useRef(null);
    const areaRef = React.useRef(null);

    const handlePageSuggestions = (e) => {
        setPageHover(Math.floor(totalPages * (e.clientY - 10) / height))
        positionRef.current = { x: e.clientX, y: e.clientY };

        if (popperRef.current != null) {
            popperRef.current.update();
        }
    };

    return (
        <Tooltip title={'Jump to Page #' + pageHover} arrow
            PopperProps={{
                popperRef,
                anchorEl: { getBoundingClientRect: () => { return new DOMRect(positionRef.current.x, areaRef.current.getBoundingClientRect().y, 0, 0,); }, },
            }}>
            <div id='page-scroll' className="scroll-container" style={{ height: height + 10 }}
                onMouseMove={handlePageSuggestions}
                onClick={(e) => jumpToPage(e)}
                ref={areaRef}>
                <Tooltip title={'Page #' + currentPage}>
                    <div id='page-scroll' className="scroll-bar" style={{ marginTop }}>{currentPage}</div>
                </Tooltip >
            </div >
        </Tooltip >
    )
};