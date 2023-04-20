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
            connectionInfo: props.connectionInfo
        }
    }

    componentDidMount() {
        let query = {
            'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': this.state.database, 'collection_name': this.state.collection
        };
        backend.get_documents_mongo_db(query, (data) => {
            let that = this;
            let objectLength = [];
            for (let i in data.documents) {
                let len = Object.keys(data.documents[i]).length;
                objectLength.push(len);
            }
            data.documents['object_length'] = objectLength;
            that.setState({ documents: data, length: data.length });
        })
    }

    componentDidUpdate() {
        let query = {
            'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': this.props.database, 'collection_name': this.props.collection
        };
        backend.get_documents_mongo_db(query, (data) => {
            // let that = this;
            // Object.keys(data.result).forEach(k => data[k] = data[k] || '');
            // that.setState({ documents: data.result.documents });
        })
    }

    render() {
        return (
            <>
                <Box className="display-documents-box-1">
                    <table width="100%" style={{ fontSize: '80%' }} cellPadding={0} cellSpacing={0}>
                        <tbody>
                            <tr>
                                <th>ObjectId</th>
                                <th>Values</th>
                            </tr>
                            {this.state.documents && this.state.documents.documents.map((e, i) => (
                                <tr key={i}>
                                    <td>
                                        {e._id}
                                    </td>
                                    <td>
                                        {e.object_length}
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </Box>
                <Box className="display-documents-box-2">
                    <TextField fullWidth id="fullWidth" multiline
                        rows={6} placeholder="Enter a query"/>
                </Box >
            </>
        );
    }
}