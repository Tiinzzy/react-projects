import React, { Component } from 'react';

import EventEmitter from 'eventemitter3';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export const eventEmitter = new EventEmitter();

export default class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            droppedImage: null,
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
                    eventEmitter.emit('reloadImages', { msg: 'reload' });
                }
            })

        });
    }

    render() {
        return (
            <>
                <div id="dropzone" className="dropzone"
                    style={{ height: 200, border: 'dotted 4px gray', borderRadius: 10, padding: 20, margin: 10, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Drag and drop an image here.</span>
                </div>
            </>
        );
    }
}