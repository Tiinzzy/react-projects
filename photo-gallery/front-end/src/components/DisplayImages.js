import React, { Component } from 'react';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class DisplayImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        backend.all_image((data)=>{
            console.log(data)
        })

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