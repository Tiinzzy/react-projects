import React, { Component } from 'react';

import { eventEmitter } from './DropZone';
import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class DisplayImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        eventEmitter.on('reloadImages', (data) => {
            if (data.msg === 'reload') {
                backend.all_image((data) => {
                    console.log(data)
                })
            };
        })

        backend.all_image((data) => {
            console.log(data)
        })

    }

    componentWillUnmount() {
        eventEmitter.off('reloadImages');
    }


    render() {
        return (
            <>
                <div>
                    hello
                </div>
            </>
        );
    }
}