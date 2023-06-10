import React from "react";

import './style.css';

export default function ScrollBar({ height, totalPages, currentPage, callParent }) {
    var marginTop = height / totalPages * currentPage;

    const jumpToPage = (e) => {
        let pageNo = Math.floor(totalPages * (e.clientY - 10) / height);
        pageNo = (pageNo > totalPages ? totalPages : pageNo);
        pageNo = (pageNo < 0 ? 0 : pageNo);
        callParent(pageNo);
    }

    return (
        <div id='page-scroll' className="scroll-container" style={{ height: height + 10 }}
            // onMouseMove={(e) => console.log('PAGE:' + Math.floor(totalPages * (e.clientY - 10) / height))}
            onClick={(e) => jumpToPage(e)}>
            <div id='page-scroll' className="scroll-bar" style={{ marginTop }}>{currentPage}</div>
        </div >
    )
};