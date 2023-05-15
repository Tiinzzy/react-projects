import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import KanbanTable from "./KanbanTable";

class MainHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Box style={{ width: 1400, marginBottom: 35 }}>
                    <Typography fontWeight="bold" fontFamily="helvetica" fontSize="18px"> Kanbana Board</Typography>
                </Box>
                <KanbanTable />
            </Box>
        );
    }
}
export default MainHome;