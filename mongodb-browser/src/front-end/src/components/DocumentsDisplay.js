import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import BackEndConnection from './BackEndConnection';
import DocumentDialog from './DocumentDialog';

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
            selected: 0,
            selectedId: '',
            openDialog: false
        }
        this.handleCLoseDialog = this.handleCLoseDialog.bind(this);
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
            that.setState({ oneDocument: data.documents[0], openDialog: true, clickedRow: e }, () => {
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

    getDropCommand() {
        let command = "db." + this.props.collection + ".drop()";
        this.setState({ command, selected: 4 });
    }

    getCommandChanges(e) {
        this.setState({ command: e.target.value });
    }

    submitCommand() {
        if (this.state.selected === 1) {
            let info = this.state.command.substring(this.state.command.indexOf("d(") + 1);
            info = info.replace("(", "").replace(")", "");

            this.state.query['search_condition'] = JSON.parse([info]);
            backend.get_documents_mongo_db(this.state.query, (data) => {
                let that = this;
                that.setState({ oneDocument: data.documents }, () => {
                    if (data.length > 0) {
                        delete this.state.query['search_condition'];
                    };
                })
            })
        } else if (this.state.selected === 2) {
            let info = this.state.command.substring(this.state.command.indexOf("y(") + 1);
            info = info.replace("(", "").replace(")", "");
            const myObj = JSON.parse(info);

            this.state.query['documents'] = myObj;
            backend.insert_documents_mongo_db(this.state.query, (data) => {
                if (data.inserted_count > 0) {
                    console.log('successful');
                };
            })
        } else if (this.state.selected === 4) {
            backend.drop_collection_mongo_db(this.state.query, (data) => {
                if (data.result) {
                    console.log('collection dropped');
                };
            })
        }
    }

    handleCLoseDialog(data) {
        if (data && data.action === 'close') {
            this.setState({ openDialog: false }, () => {
                this.componentDidMount();
            });
        }
    }

    render() {
        return (
            <>
                <Box className="display-documents-box-1">
                    <div style={{ padding: 10, border: 'solid 1px #bbb', width: '100%' }}>
                        <Box className="display-documents-left-box">
                            <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={0}>
                                <tbody >
                                    <tr>
                                        <th width='20%'>ObjectId</th>
                                        <th width='20%'>Number of Object Keys</th>
                                        <th width='60%'>Values</th>
                                    </tr>
                                    {this.state.documents && this.state.documents.map((e, i) => (
                                        <tr key={i} onClick={() => this.displayData(e._id)}>
                                            <td style={{ color: this.state.selectedId === e._id ? '#1589FF' : 'black' }}
                                                onClick={() => this.setState({ selectedId: e._id })}>
                                                {e._id}
                                            </td>
                                            <td>
                                                {Object.keys(e).length}
                                            </td>
                                            <td>
                                                {this.state.documents[e]}
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </Box>
                    </div>
                </Box>
                <Dialog maxWidth="xl" open={this.state.openDialog} onClose={() => this.handleCLoseDialog()} className="document-dialog">
                    <DocumentDialog clickedRow={this.state.clickedRow} oneDocument={this.state.oneDocument} query={this.state.query} handleCLoseDialog={this.handleCLoseDialog} />
                </Dialog>
            </>
        );
    }
}