import React, { useState, useEffect } from "react";

import './style.css';

function getWindowSize() {
    return { h: window.innerHeight, w: window.innerWidth }
}

export default function ScrollBar({ height, totalPages, currentPage }) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffsetY, setDragOffsetY] = useState(0);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    var marginTop = windowSize.h / totalPages * currentPage;

    useEffect(() => {
        function resizeHandler() {
            setWindowSize(getWindowSize())
        }
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    })


    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragOffsetY(e.clientY - e.target.getBoundingClientRect().top);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            e.preventDefault();
            const scrollContainer = e.target.parentElement;
            const scrollContent = scrollContainer.firstChild;
            const scrollBar = e.target;
            const newY = e.clientY - scrollContainer.getBoundingClientRect().top - dragOffsetY;

            const maxScroll = scrollContainer.clientHeight - scrollBar.clientHeight;
            const clampedY = Math.max(0, Math.min(maxScroll, newY));

            const scrollPosition = clampedY / maxScroll;
            const newScrollTop = scrollPosition * (scrollContent.clientHeight - scrollContainer.clientHeight);

            scrollContent.style.marginTop = -newScrollTop + 'px';
            marginTop = -newScrollTop;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="scroll-container" style={{ height: windowSize.h === 980 ? windowSize.h * 0.6 : windowSize.h }}>
            <div className="scroll-bar" style={{ marginTop }}
                onMouseDownCapture={handleMouseDown}
                onMouseMoveCapture={handleMouseMove}
                onMouseOutCapture={handleMouseUp}></div>
        </div>
    )

};