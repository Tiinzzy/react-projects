import React from "react";

import Box from '@mui/material/Box';

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
            console.log(data);
        })
    }

    componentDidUpdate() {
        let query = {
            'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': this.props.database, 'collection_name': this.props.collection
        };
        backend.get_documents_mongo_db(query, (data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <Box>
                this will be documents display content
            </Box>
        );
    }
}