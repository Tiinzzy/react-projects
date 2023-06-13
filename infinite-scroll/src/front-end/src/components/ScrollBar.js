import React from 'react';

import './style.css';

const SCROLL_BAR_INDICATOR_HEIGHT = 10;
const TOOL_TIP_Y_OFFSET = 15;
const TOOL_TIP_X_OFFSET = 215;

export default function ScrollBar({ buttonHeight, height, totalPages, currentPage, callParent }) {
    const jumpToPage = (e) => {
        let pageNo = Math.floor(totalPages * (e.clientY - buttonHeight - SCROLL_BAR_INDICATOR_HEIGHT) / (height - SCROLL_BAR_INDICATOR_HEIGHT));
        pageNo = (pageNo > totalPages ? totalPages : pageNo);
        pageNo = (pageNo < 0 ? 0 : pageNo);
        callParent(pageNo);
    }

    return (
        <div>
            <div id='page-scroll' className="scroll-container" style={{ height: height }}
                onMouseLeave={(e) => {
                    let tooTipDiv = document.getElementById("tool-tip");
                    tooTipDiv.style.display = "none";
                    tooTipDiv.style.top = 0;
                    tooTipDiv.style.left = 0;
                }}
                onMouseMove={(e) => {
                    let pageNo = Math.floor(totalPages * (e.clientY - buttonHeight - SCROLL_BAR_INDICATOR_HEIGHT) / (height - SCROLL_BAR_INDICATOR_HEIGHT));
                    pageNo = (pageNo > totalPages ? totalPages : pageNo);
                    pageNo = (pageNo < 0 ? 0 : pageNo);
                    let tooTipDiv = document.getElementById("tool-tip");
                    tooTipDiv.style.top = (e.clientY - TOOL_TIP_Y_OFFSET) + 'px';
                    tooTipDiv.style.left = (window.innerWidth - TOOL_TIP_X_OFFSET) + 'px';
                    tooTipDiv.textContent = 'Jump to page # ' + pageNo;
                    tooTipDiv.style.display = "block";
                }}
                onClick={(e) => jumpToPage(e)}>
                <div id='page-scroll' className="scroll-bar" style={{ marginTop: (height - SCROLL_BAR_INDICATOR_HEIGHT) / totalPages * currentPage }}>{currentPage}</div>
            </div >
            <div id="tool-tip" className='tool-tip'>
            </div>
        </div>
    )
};