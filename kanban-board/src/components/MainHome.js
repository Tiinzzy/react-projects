import React from "react";

import Box from "@mui/material/Box";

import KanbanTable from "./KanbanTable";

class MainHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 20 }}>
                <KanbanTable />
            </Box>
        );
    }
}
export default MainHome;