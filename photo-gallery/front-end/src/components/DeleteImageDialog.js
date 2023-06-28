import React, { Component } from 'react';

export default class DeleteImageDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfImages: [],
            count: 0,
            width: 300,
            openBackdrop: false,
            clickedImage: '',
            openDialog: false
        }
    }

    render() {
        return (
            <>
              this will be delete dialog 
            </>
        );
    }
}


