import React, { Component } from 'react';

import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

import EventEmitter from 'eventemitter3';

import BackEndConnection from './BackEndConnection';

export const eventEmitter = new EventEmitter();

const backend = BackEndConnection.INSTANCE();

const dropzoneStyle = {
    height: 25,
    border: 'dotted 2px gray',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'width 0.3s, height 0.5s',
};

const dropzoneStyleHovered = {
    ...dropzoneStyle,
    height: 250,
    border: 'dotted 4px gray',
};


export default class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        }
    }

    componentDidMount() {
        const dropZone = document.getElementById('dropzone');

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();

            const files = e.dataTransfer.files;

            let uploaded_image = files[0];

            const formData = new FormData();
            formData.append('file', uploaded_image);

            backend.upload_image(formData, (data) => {
                if (data.success) {
                    eventEmitter.emit('reload', { message: 'check-for-update' });
                }
            })

        });
    }

    handleMouseEnter() {
        this.setState({ isHovered: true });
    };

    handleMouseLeave() {
        this.setState({ isHovered: false });
    };

    render() {
        return (
            <>
                <div id="dropzone" className="dropzone"
                    style={this.state.isHovered ? dropzoneStyleHovered : dropzoneStyle}
                    onMouseEnter={() => this.handleMouseEnter()}
                    onMouseLeave={() => this.handleMouseLeave()}
                    onDragEnter={() => this.handleMouseEnter()}
                    onDragLeave={() => this.handleMouseLeave()}>
                    <span>{this.state.isHovered === true ?
                        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <DownloadForOfflineOutlinedIcon fontSize="large" />
                            <div style={{ marginTop: 15 }}>Drag and drop an image here.</div>
                        </span>
                        : <DownloadForOfflineOutlinedIcon fontSize="large" />}</span>
                </div>
            </>
        );
    }
}