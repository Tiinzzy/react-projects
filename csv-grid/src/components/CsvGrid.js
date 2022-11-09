import React from "react";
import { useEffect, useRef } from "react";

import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

import Box from "@mui/material/Box";

const gridSyle = {
    width: 570
}

const bodyStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10
}

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

    const grid = new Grid({
        columns: getColumns(props.jCsv),
        data: getData(props.jCsv)
    });

    useEffect(() => {
        grid.render(wrapperRef.current);

    });

    return (<>
        <Box style={bodyStyle}>
            <Box ref={wrapperRef} style={gridSyle} />
        </Box>


    </>);
}




