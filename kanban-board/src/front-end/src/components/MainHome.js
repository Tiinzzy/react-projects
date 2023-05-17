import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';
import KanbanTable from "./KanbanTable";

const backend = BackEndConnection.INSTANCE();
const LOGS = [[], [], [], []];
let count = 1;

class MainHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if (count > 1) {
            backend.get_documents_from_mongo_db((data) => {
                let that = this;
                that.setState({ logs: data.documents });
            })
        }
        count += 1;
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Box style={{ width: 1400, marginBottom: 35 }}>
                    <Typography fontWeight="bold" fontFamily="helvetica" fontSize="18px"> Kanban Board</Typography>
                </Box>
                {this.state.logs && <KanbanTable logs={this.state.logs} />}
            </Box>
        );
    }
}
export default MainHome;