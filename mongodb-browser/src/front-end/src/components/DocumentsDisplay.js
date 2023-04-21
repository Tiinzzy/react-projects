import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

export default class DocumentsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            database: props.database,
            collection: props.collection,
            connectionInfo: props.connectionInfo,
            query: {},
            oneDocument: {},
            command: "Enter a query",
            selected: 0
        }
    }

    componentDidMount() {
        this.state.query['host_name'] = this.state.connectionInfo.host;
        this.state.query['port_name'] = this.state.connectionInfo.port;


        this.state.query['database_name'] = this.state.database;
        this.state.query['collection_name'] = this.state.collection;
        backend.get_documents_mongo_db(this.state.query, (data) => {
            let that = this;
            that.setState({ documents: data.documents, length: data.length });
        })
    }

    componentDidUpdate() {
        if (this.state.collection !== this.props.collection) {
            this.setState({ collection: this.props.collection, command: "Enter a query" }, () => {
                this.state.query['database_name'] = this.props.database;
                this.state.query['collection_name'] = this.props.collection;
                backend.get_documents_mongo_db(this.state.query, (data) => {
                    let that = this;
                    that.setState({ documents: data.documents, length: data.length });
                })
            });
        }
    }

    displayData(e) {
        this.state.query['search_condition'] = { '_id': e };
        backend.get_documents_mongo_db(this.state.query, (data) => {
            let that = this;
            that.setState({ oneDocument: data.documents[0] }, () => {
                if (data.length > 0) {
                    delete this.state.query['search_condition'];
                };
            })
        })
    }

    getFindCommand() {
        let command = "db.getCollection('" + this.props.collection + "').find({})";
        this.setState({ command, selected: 1 });
    }

    getInsertCommand() {
        let command = "db." + this.props.collection + ".insertMany()";
        this.setState({ command, selected: 2 });
    }

    getDeleteCoomand() {
        let command = "db." + this.props.collection + ".deleteOne({})";
        this.setState({ command, selected: 3 });
    }

    getDropCommand() {
        let command = "db." + this.props.collection + ".drop()";
        this.setState({ command, selected: 4 });
    }

    getCommandChanges(e) {
        this.setState({ command: e.target.value });
    }

    submitCommand() {
        if (this.state.selected === 1) {
            console.log('find')
        } else if (this.state.selected === 2) {
            console.log('insert')
        } else if (this.state.selected === 3) {
            console.log('delete')
        } else if (this.state.selected === 4) {
            console.log('drop')
        }
    }

    render() {
        return (
            <>
                <Box className="display-documents-box-1">
                    <Box className="display-documents-left-box">
                        <table width="100%" style={{ fontSize: '80%' }} cellPadding={0} cellSpacing={0}>
                            <tbody>
                                <tr>
                                    <th>ObjectId</th>
                                </tr>
                                {this.state.documents && this.state.documents.map((e, i) => (
                                    <tr key={i} onClick={() => this.displayData(e._id)}>
                                        <td>
                                            {e._id}
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </Box>
                    <Box className="display-documents-right-box">
                        <textarea style={{ width: '100%', height: '99%', overflowX: 'hide', resize: 'none', marginLeft: 5 }}
                            value={JSON.stringify(this.state.oneDocument, null, 3)} readOnly={true} wrap="soft">
                        </textarea>
                    </Box>
                </Box>
                <Box className="display-documents-box-2">
                    <Box className="display-documents-right-box">
                        <TextField fullWidth id="fullwidth" multiline
                            rows={6} value={this.state.command} onChange={(e) => this.getCommandChanges(e)} />
                        <Box>
                            <IconButton color="primary" aria-label="upload picture" component="label" title="find document" onClick={() => this.getFindCommand()}>
                                <SearchOutlinedIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="label" title="insert document" onClick={() => this.getInsertCommand()} >
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="label" title="delete document" onClick={() => this.getDeleteCoomand()}>
                                <RemoveCircleOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="label" title="drop collection" onClick={() => this.getDropCommand()}>
                                <DeleteOutlineIcon />
                            </IconButton>
                            <Button variant="contained" size="small" onClick={() => this.submitCommand()}>Submit</Button>
                        </Box>
                    </Box>
                </Box >
            </>
        );
    }
}