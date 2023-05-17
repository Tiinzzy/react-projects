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
            logs: {}
        }
    }

    componentDidMount() {
        if (count > 1) {
            backend.get_documents_from_mongo_db((data) => {
                let that = this;
                that.setState({ logs: data.documents });
                // for (let i in data.documents) {
                //     if (data.documents[i].status === 'Backlog') {
                //         LOGS[0].push(data.documents[i]);
                //     } else if (data.documents[i].status === 'To Do') {
                //         LOGS[1].push(data.documents[i]);
                //     } else if (data.documents[i].status === 'In Progress') {
                //         LOGS[2].push(data.documents[i]);
                //     } else if (data.documents[i].status === 'Completed') {
                //         LOGS[3].push(data.documents[i]);
                //     }
                // }
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
                <KanbanTable logs={this.state.logs} />
            </Box>
        );
    }
}
export default MainHome;