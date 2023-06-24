import React, { useState } from "react";

const BOX_STYLE = function (width) {
    return {
        display: "inline-block",
        height: width,
        width: width,
        marginRight: 10,
        marginBottom: 10,
        border: "solid 1px darkred",
        textAlign: "center",
        overflow: 'hidden'
    };
};

const NAMES = [
    "Steven James",
    "Julia Olsen",
    "Ana Mcbride",
    "Caylee Preston",
    "Kaiya Mccall",
    "Xiomara Thompson",
    "Parker Willis",
    "Nathanial Quinn",
    "Madden Boyer",
    "Kali Roy",
    "Aydan Blevins",
    "Chaz Perry",
];

function GetBox({ id, width }) {
    return <div style={BOX_STYLE(width)}>{id}</div>;
}

function getSpace(columnsCount) {
    return columnsCount * 13;
}

export default function ResizableGrid(props) {
    const [count, setCount] = useState(0);
    const [width, setWdith] = useState(300);

    if (count < 2) {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        setCount(15);
    }

    function resizeWindow() {
        let screenWidth = window.innerWidth * 0.95;
        if (screenWidth < 500) {
            setWdith(screenWidth - getSpace(2));
        } else if (screenWidth < 1000) {
            setWdith((screenWidth - getSpace(4)) / 4);
        } else if (screenWidth < 1500) {
            setWdith((screenWidth - getSpace(6)) / 6);
        } else {
            setWdith((screenWidth - getSpace(8)) / 8);
        }
    }

    return (
        <div style={{ margin: "auto", width: '95%', border: 'solid 0px green' }}>
            {NAMES.map((n, i) => (
                <GetBox key={i} width={width} id={n} />
            ))}
        </div>
    );
}