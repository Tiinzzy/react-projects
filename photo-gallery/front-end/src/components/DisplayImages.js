import React, { Component } from 'react';

import Backdrop from '@mui/material/Backdrop';

import BackEndConnection from './BackEndConnection';

import { eventEmitter } from './DropZone';

const backend = BackEndConnection.INSTANCE();

const BOX_STYLE = function (width) {
    return {
        display: "inline-block",
        height: width,
        width: width,
        marginRight: 10,
        marginBottom: 10,
        border: "solid 1px gray",
        borderRadius: 2,
        textAlign: "center",
        overflow: 'hidden'
    };
};

export default class DisplayImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfImages: [],
            count: 0,
            width: 300,
            openBackdrop: false,
            clickedImage: ''
        }
    }

    componentDidMount() {
        if (this.state.count < 1) {
            this.resizeWindow();
            let arrayOfImages = [];

            eventEmitter.on('reload', (data) => {
                if (data.message === 'check-for-update') {
                    this.addToArray();
                }
            });

            backend.all_image((data) => {
                if (Object.keys(data).length > 0) {
                    for (let i in data) {
                        let images = data[i].file;
                        arrayOfImages.push(images);
                    }
                    const noDuplicates = [...new Set(arrayOfImages)];

                    this.setState({ arrayOfImages: noDuplicates });
                }
            })
            window.addEventListener("resize", this.resizeWindow);
            window.addEventListener('resize', this.setSquareImageSize);
            this.setState({ count: 2 });
        }
    }

    resizeWindow = () => {
        let screenWidth = window.innerWidth * 0.95;
        if (screenWidth < 500) {
            this.setState({ width: screenWidth - this.getSpace(2) });
        } else if (screenWidth < 1000) {
            this.setState({ width: (screenWidth - this.getSpace(4)) / 4 });
        } else if (screenWidth < 1500) {
            this.setState({ width: (screenWidth - this.getSpace(6)) / 6 });
        } else {
            this.setState({ width: (screenWidth - this.getSpace(8)) / 8 });
        }
    };

    getSpace(columnsCount) {
        return columnsCount * 13;
    }

    setSquareImageSize() {
        const image = document.getElementById('backdrop-image');

        const minDimension = Math.min(window.innerHeight, window.innerWidth);

        image.style.width = minDimension + 'px';
        image.style.height = minDimension + 'px';
    }

    addToArray() {
        let copyArray = [...this.state.arrayOfImages];

        backend.all_image((data) => {
            if (Object.keys(data).length > 0) {
                for (let i in data) {
                    if (!copyArray.includes(data[i].file)) {
                        copyArray.push(data[i].file);
                    }
                }
                const noDuplicates = [...new Set(copyArray)];
                this.setState({ arrayOfImages: noDuplicates });
                console.log(noDuplicates.length, 'no dup len')
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeWindow);
        window.removeEventListener('resize', this.setSquareImageSize);
        eventEmitter.off('reload');
    }


    render() {
        const { width } = this.state;

        return (
            <>
                <div style={{ margin: "auto", width: '95%', border: 'solid 0px green' }}>
                    {this.state.arrayOfImages.length > 0 && this.state.arrayOfImages.map((n, i) => (
                        <img key={i} src={n} style={BOX_STYLE(width)} alt={'image ' + i} onClick={() => { this.setState({ openBackdrop: true, clickedImage: n }) }} />
                    ))}
                </div>

                <Backdrop
                    sx={{ color: '#424242', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.openBackdrop}
                    onClick={() => { this.setState({ openBackdrop: false }) }}>
                    <img id="backdrop-image" src={this.state.clickedImage} width={window.innerWidth - 500} height={window.innerHeight - 100} alt="clicked img" />
                </Backdrop>
            </>
        );
    }
}






