import React, { Component } from 'react';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import DeleteImageDialog from './DeleteImageDialog';
import BackEndConnection from './BackEndConnection';
import { findTheObject } from './functions';

import { eventEmitter } from './DropZone';
import { deleteEmitter } from './DeleteImageDialog';

import './style.css';

const backend = BackEndConnection.INSTANCE();

const IMAGE_STYLE = function (width) {
    return {
        display: "inline-block",
        height: width,
        width: width,
        border: "solid 1px #eaeaea",
        borderRadius: 2,
        textAlign: "center",
        overflow: 'hidden',
        objectFit: 'cover',
        position: 'relative',
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
            selectedImage: '',
            hoveredImage: '',
            widthCount: 0
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
        let screenWidth = window.innerWidth - 60;
        if (screenWidth < 300) {
            this.setState({ width: (screenWidth - this.getSpace(1)) / 1, widthCount: 1 });
        } else if (screenWidth < 500) {
            this.setState({ width: (screenWidth - this.getSpace(2)) / 2, widthCount: 2 });
        } else if (screenWidth < 1000) {
            this.setState({ width: (screenWidth - this.getSpace(4)) / 4, widthCount: 4 });
        } else if (screenWidth < 1500) {
            this.setState({ width: (screenWidth - this.getSpace(6)) / 6, widthCount: 6 });
        } else {
            this.setState({ width: (screenWidth - this.getSpace(8)) / 8, widthCount: 8 });
        }
    };

    getSpace(columnsCount) {
        return columnsCount * 2
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

    deleteImageNow(image) {
        this.setState({ openDialog: false, selectedImage: image }, () => {
            let deleteImage = findTheObject(this.state.allImagesInfo, this.state.selectedImage);
            let imageName = deleteImage.file_real_name;
            backend.delete_image(imageName, (data) => {
                if (data.success) {
                    this.removeFromArray();
                };
            })
        });
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

    handleMouseEnter(image) {
        this.setState({ hoveredImage: image });
    }

    handleMouseLeave() {
        this.setState({ hoveredImage: '' });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeWindow);
        eventEmitter.off('reload');
        deleteEmitter.off('check_updated');
    }

    render() {
        const { width, widthCount, hoveredImage } = this.state;
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ margin: "auto", border: 'solid 0px red', alignItems: 'center', justifyContent: 'center', display: 'inline-block' }} className="image-container">
                    {this.state.arrayOfImages.length > 0 && this.state.arrayOfImages.map((n, i) => (
                        <span key={i}
                            onDoubleClick={() => this.deleteImage(n)}
                            onMouseEnter={() => this.handleMouseEnter(n)}
                            onMouseLeave={() => this.handleMouseLeave()}
                            className={`image ${n === this.state.hoveredImage ? 'hovered' : ''}`}>
                            <div style={{ display: i % widthCount === 0 ? 'block' : 'inline-block' }}>
                            </div>
                            <span className="image-container">
                                <img src={n} alt={'image ' + i} style={IMAGE_STYLE(width)} />
                                {hoveredImage === n && <div className='overlay' style={{ color: 'white', fontWeight: 'bold', textAlign: 'right', fontSize: '25px' }}>
                                    <Tooltip title="Delete Image" placement="left">
                                        <IconButton onClick={() => this.deleteImageNow(n)} style={{ cursor: 'pointer', color: 'white' }}>
                                            <DisabledByDefaultRoundedIcon fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </div>}
                            </span>
                        </span>
                    ))}
                </div>

                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()} maxWidth="xl">
                    {this.state.allImagesInfo && <DeleteImageDialog handleCloseDialog={this.handleCloseDialog} selectedImage={this.state.selectedImage} allImagesInfo={this.state.allImagesInfo} />}
                </Dialog>
            </div>
        );
    }
}

