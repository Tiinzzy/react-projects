import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
            query: {}
        }
    }

    componentDidMount() {
        this.state.query['host_name'] = this.state.connectionInfo.host;
        this.state.query['port_name'] = this.state.connectionInfo.port;
        this.state.query['database_name'] = this.props.database;
        this.state.query['collection_name'] = this.props.collection;

        backend.get_documents_mongo_db(this.state.query, (data) => {
            let that = this;
            that.setState({ documents: data.documents, length: data.length });
        })
    }

    componentDidUpdate() {
        if (this.state.collection !== this.props.collection) {
            this.setState({ collection: this.props.collection }, () => {
                this.state.query['database_name'] = this.props.database;
                this.state.query['collection_name'] = this.props.collection;

                backend.get_documents_mongo_db(this.state.query, (data) => {
                    let that = this;
                    that.setState({ documents: data.documents, length: data.length });
                })
            });
        } else {
            return;
        }
    }

    displayData(e) {
        this.state.query['search_condition'] = { '_id': e };
        console.log(this.state.query)
        backend.get_documents_mongo_db(this.state.query, (data) => {
            let that = this;
            console.log(data);
        })
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
                        right box
                    </Box>
                </Box>
                <Box className="display-documents-box-2">
                    <TextField fullWidth id="fullWidth" multiline
                        rows={6} placeholder="Enter a query" />
                </Box >
            </>
        );
    }
}