import React, { Component } from 'react';

import Dialog from '@mui/material/Dialog';

import DeleteImageDialog from './DeleteImageDialog';
import BackEndConnection from './BackEndConnection';

import { eventEmitter } from './DropZone';
import { deleteEmitter } from './DeleteImageDialog';

const backend = BackEndConnection.INSTANCE();

const BOX_STYLE = function (width) {
    return {
        display: "inline-block",
        height: width,
        width: width,
        marginRight: 10,
        marginBottom: 10,
        border: "solid 1px #eaeaea",
        borderRadius: 2,
        textAlign: "center",
        overflow: 'hidden',
        objectFit: 'cover'
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
            clickedImage: '',
            openDialog: false,
            selectedImage: ''
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
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

            deleteEmitter.on('check_updated', (data) => {
                if (data.message === 'image_deleted') {
                    this.removeFromArray();
                }
            })

            backend.all_image((data) => {
                if (Object.keys(data).length > 0) {
                    for (let i in data) {
                        let images = data[i].file;
                        arrayOfImages.push(images);
                    }
                    const noDuplicates = [...new Set(arrayOfImages)];

                    this.setState({ arrayOfImages: noDuplicates, allImagesInfo: data });
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
        let copyArray = [...this.state.arrayOfImages];

        backend.all_image((data) => {
            if (Object.keys(data).length > 0) {
                for (let i in data) {
                    if (!copyArray.includes(data[i].file)) {
                        copyArray.push(data[i].file);
                    }
                }
                const noDuplicates = [...new Set(copyArray)];
                this.setState({ arrayOfImages: noDuplicates, allImagesInfo: data });
            }
        })
    }

    removeFromArray() {
        let copyArray = [...this.state.arrayOfImages];
        const updatedArray = copyArray.filter((e) => e !== this.state.selectedImage);
        this.setState({ arrayOfImages: updatedArray });
    }

    deleteImage(image) {
        this.setState({ openDialog: true, selectedImage: image });
    }

    handleCloseDialog() {
        this.setState({ openDialog: false });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeWindow);
        eventEmitter.off('reload');
        deleteEmitter.off('check_updated');
    }


    render() {
        const { width } = this.state;

        return (
            <>
                <div style={{ margin: "auto", width: '95%', border: 'solid 0px green' }}>
                    {this.state.arrayOfImages.length > 0 && this.state.arrayOfImages.map((n, i) => (
                        <img key={i} src={n} style={BOX_STYLE(width)} alt={'image ' + i}
                            onClick={() => this.deleteImage(n)} />
                    ))}
                </div>

                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()} maxWidth="xl">
                    {this.state.allImagesInfo && <DeleteImageDialog handleCloseDialog={this.handleCloseDialog} selectedImage={this.state.selectedImage} allImagesInfo={this.state.allImagesInfo} />}
                </Dialog>
            </>
        );
    }
}






