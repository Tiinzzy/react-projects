import React, { Component } from 'react';

import { eventEmitter } from './DropZone';
import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const IMAGE_PATH = '/images/';

const BOX_STYLE = function (width) {
    return {
        display: "inline-block",
        height: width,
        width: width,
        marginRight: 10,
        marginBottom: 10,
        border: "solid 1px darkred",
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
            width: 300
        }
    }

    componentDidMount() {
        if (this.state.count < 2) {
            this.resizeWindow();
            let arrayOfImages = [];
            eventEmitter.on('reloadImages', (data) => {
                if (data.msg === 'reload') {
                    backend.all_image((data) => {
                        if (data.length > 0) {
                            for (let i in data) {
                                let images = IMAGE_PATH + data[i].alternative_name;
                                arrayOfImages.push(images)
                            }
                            this.setState({ arrayOfImages })
                        }
                    })
                };
            })

            backend.all_image((data) => {
                if (data.length > 0) {
                    for (let i in data) {
                        let images = IMAGE_PATH + data[i].alternative_name;
                        arrayOfImages.push(images)
                    }
                    this.setState({ arrayOfImages })
                }
            })
            window.addEventListener("resize", this.resizeWindow);
            this.setState({ count: 15 });
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

    componentWillUnmount() {
        eventEmitter.off('reloadImages');
        window.removeEventListener("resize", this.resizeWindow);
    }


    render() {
        const { width } = this.state;

        return (
            <>
                <div style={{ margin: "auto", width: '95%', border: 'solid 0px green' }}>
                    {this.state.arrayOfImages.length > 0 && this.state.arrayOfImages.map((n, i) => (
                        <div key={i} style={BOX_STYLE(width)}>
                            <img src={n} style={BOX_STYLE(width)} />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}