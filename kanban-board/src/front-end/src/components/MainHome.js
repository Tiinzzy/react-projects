import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';
import KanbanTable from "./KanbanTable";

const backend = BackEndConnection.INSTANCE();

class MainHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: {}
        }
    }

    componentDidMount() {
        backend.get_documents_from_mongo_db((data) => {
            let that = this;
            that.setState({ logs: data.documents });
        })
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Box style={{ width: 1400, marginBottom: 35 }}>
                    <Typography fontWeight="bold" fontFamily="helvetica" fontSize="18px"> Kanban Board</Typography>
                </Box>
                <KanbanTable logs={this.state.logs} />
            </Box>
        );
    }
}
export default MainHome;