import React from "react";

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import BackEndConnection from './BackEndConnection';
import DocumentDialog from './DocumentDialog';
import DepthTitle from './DepthTitle';
import InsertDocumentDialog from './InsertDocumentDialog';

import './style.css';

const backend = BackEndConnection.INSTANCE();


function safeLength(s, max) {
    if (s.length > max) {
        return s.substring(0, max) + ' ...';
    } else {
        return s;
    }
}

export default class DocumentsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            database: props.database,
            collection: props.collection,
            connectionInfo: props.connectionInfo,
            query: {},
            oneDocument: {},
            openDialog: false,
            selected: 0
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
            that.setState({ oneDocument: data.documents[0], openDialog: true, clickedRow: e, selected: 1 }, () => {
                if (data.length > 0) {
                    delete this.state.query['search_condition'];
                };
            })
        })
    }

    handleCLoseDialog(data) {
        if (data && data.action === 'close') {
            this.setState({ openDialog: false }, () => {
                this.componentDidMount();
            });
        }
    }

    insertDocumentCollection() {
        this.setState({ openDialog: true, selected: 2 })
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', border: 'solid 1px red', paddingRight: 10 }}>
                    <Box style={{ border: 'solid 0px red', width: 300 }}>
                        <DepthTitle database={this.state.database} collection={this.state.collection} />
                    </Box>
                    <Box flexGrow={1} />
                    <Tooltip title="Insert Document in Collection" arrow>
                        <IconButton color="black" onClick={() => this.insertDocumentCollection()}>
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box className="display-documents-box-1">
                    <div style={{ padding: 10, border: 'solid 1px #bbb', width: '100%' }}>
                        <Box className="display-documents-left-box">
                            <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
                                <tbody >
                                    <tr>
                                        <th width='20%'>ObjectId</th>
                                        <th width='20%'>Number of Object Keys</th>
                                        <th width='60%'>Values</th>
                                    </tr>
                                    {this.state.documents && this.state.documents.map((e, i) => (
                                        <tr key={i} onDoubleClick={() => this.displayData(e._id)}
                                            style={{ color: this.state.selectedId === e._id ? '#1589FF' : 'black' }}
                                            onClick={() => this.setState({ selectedId: e._id })}>
                                            <td>
                                                {e._id}
                                            </td>
                                            <td>
                                                {Object.keys(e).length}
                                            </td>
                                            <td>
                                                {safeLength(JSON.stringify(e), 100)}
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </Box>
                    </div>
                </Box>
                <Dialog maxWidth="xl" open={this.state.openDialog} onClose={() => this.handleCLoseDialog()} className="document-dialog">
                    {this.state.selected === 1 ?
                        <DocumentDialog clickedRow={this.state.clickedRow} oneDocument={this.state.oneDocument} query={this.state.query} handleCLoseDialog={this.handleCLoseDialog} />
                        : <InsertDocumentDialog />}
                </Dialog>
            </>
        );
    }
}