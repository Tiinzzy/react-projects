import React, { useState, useEffect } from "react";

import './style.css';

function getWindowSize() {
    return { h: window.innerHeight, w: window.innerWidth }
}

export default function ScrollBar({ height, totalPages, currentPage, callParent }) {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    var marginTop = height / totalPages * currentPage;

    useEffect(() => {
        function resizeHandler() {
            setWindowSize(getWindowSize())
        }
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    })

    const jumpToPage = (pageNo) => {
        pageNo = (pageNo > totalPages ? totalPages : pageNo);
        pageNo = (pageNo < 0 ? 0 : pageNo);
        console.log(pageNo, totalPages);
        callParent(pageNo);
    }

    return (
        <div className="scroll-container" style={{ height: height + 10 }}
            onClick={(e) => {
                jumpToPage(Math.floor(totalPages * (e.clientY - 10) / height), e.clientY);
            }}>
            <div className="scroll-bar" style={{ marginTop }}>{currentPage}</div>
        </div >
    )
};