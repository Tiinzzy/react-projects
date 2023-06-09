import React, { useState } from 'react';

import './style.css';

export default function ScrollBar({ height, totalPages, currentPage }) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffsetY, setDragOffsetY] = useState(0);

    const marginTop = height / totalPages * currentPage;

    const handleMouseDown = (e) => {
        console.log(1)
        setIsDragging(true);
        setDragOffsetY(e.clientY - e.target.getBoundingClientRect().top);
    };

    const handleMouseMove = (e) => {
        console.log(2)
        if (isDragging) {
            console.log(3)
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
        }
    };

    const handleMouseUp = () => {
        console.log(4)
        setIsDragging(false);
    };

    return (
        <div className="scroll-container">
            <div style={{ marginTop }} className="scroll-bar" 
            onMouseDownCapture={handleMouseDown} onMouseMoveCapture={handleMouseMove} onMouseOutCapture={handleMouseUp}></div>
        </div>
    )

};