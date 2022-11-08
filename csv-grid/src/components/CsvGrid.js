import React from "react";
import { useEffect, useRef } from "react";

import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";


function getColumns(jCsv) {
    let row = jCsv[0];
    let columns = [];
    for (let c in row) {
        columns.push(c);
    }
    return columns;
}

function getData(jCsv) {
    let data = [];
    for (let r in jCsv) {
        let row = [];
        for (let c in jCsv[r]) {
            row.push(jCsv[r][c])
        }
        data.push(row);
    }
    return data;
}

export default function CsvGrid(props) {
    const wrapperRef = useRef(null);

    // console.log(props.jCsv);
    // console.log(getColumns(props.jCsv));
    // console.log(getData(props.jCsv));

    const grid = new Grid({
        columns: getColumns(props.jCsv),
        data: getData(props.jCsv)
    });

    useEffect(() => {
        grid.render(wrapperRef.current);

    });

    return (<>
        <div ref={wrapperRef} />
    </>);
}




