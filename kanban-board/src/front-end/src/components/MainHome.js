import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';
import KanbanTable from "./KanbanTable";

import KanbanContext from "../KanbanContext";

const backend = BackEndConnection.INSTANCE();
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
                this.setState({ logs: data.documents });
            })
        }
        count += 1;
    }

    render() {
        return (
            <KanbanContext.Consumer>
                {(context) => (
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Box style={{ width: '85%', marginBottom: 35 }}>
                            <Typography onClick={() => context.callback(new Date())}  fontWeight="bold" fontFamily="helvetica" fontSize="18px"> Kanban Board {context.counter}</Typography>
                        </Box>
                        {this.state.logs && <KanbanTable logs={this.state.logs} />}
                    </Box>
                )}
            </KanbanContext.Consumer>
        );
    }
}
export default MainHome;

