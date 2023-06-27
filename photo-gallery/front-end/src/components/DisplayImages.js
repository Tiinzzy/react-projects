import React, { Component } from 'react';

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

let arrayOfImages = [];

export default class DisplayImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfImages: [],
            count: 0,
            width: 300
        }
    }

    componentDidMount() {
        if (this.state.count < 1) {
            this.resizeWindow();

            eventEmitter.on('reload', (data) => {
                if (data.message === 'check-for-update') {
                    this.addToArray();
                }
            });

            backend.all_image((data) => {
                if (Object.keys(data).length > 0) {
                    for (let i in data) {
                        let images = data[i].path;
                        arrayOfImages.push(images);
                    }
                    const noDuplicates = [...new Set(arrayOfImages)];

                    this.setState({ arrayOfImages: noDuplicates });
                }
            })
            window.addEventListener("resize", this.resizeWindow);
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

    addToArray() {
        backend.all_image((data) => {
            if (Object.keys(data).length > 0) {
                for (let i in data) {
                    if (!arrayOfImages.includes(data[i].path)) {
                        arrayOfImages.push(data[i].path);
                    }
                }
                const noDuplicates = [...new Set(arrayOfImages)];
                this.setState({ arrayOfImages: noDuplicates });
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeWindow);
        eventEmitter.off('reload');
    }


    render() {
        const { width } = this.state;

        return (
            <>
                <div style={{ margin: "auto", width: '95%', border: 'solid 0px green' }}>
                    {this.state.arrayOfImages.length > 0 && this.state.arrayOfImages.map((n, i) => (
                        <img key={i} src={n} style={BOX_STYLE(width)} alt={'image ' + i} />
                    ))}
                </div>
            </>
        );
    }
}
