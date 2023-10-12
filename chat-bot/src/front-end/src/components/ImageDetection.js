import React from 'react';
import { Button, Container, Grid } from '@mui/material';
import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class ImageDetection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
    }

    handleImageSelect(e) {
        const image = e.target.files[0];
        this.handleImageChange(image);
    }

    handleImageDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        this.handleImageChange(file);
    }

    handleImageSelect(e) {
        const imageFile = e.target.files[0]; 
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            this.setState({ image: imageUrl }, () => {
                let query = { 'image_url': this.state.image };
                backend.process_image_detection(query, (data) => {
                    console.log(data)
                });
            });
        }
    }

    preventDefault(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid alignItems="center">
                    <Grid item xs={12} md={6}>
                        <div
                            onDrop={(e) => this.handleImageDrop(e)}
                            onDragOver={(e) => this.preventDefault(e)}
                            style={{ border: '2px dashed #ccc', textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                        >
                            {this.state.image ? (
                                <img src={this.state.image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                            ) : (
                                <p>Drag & drop an image here or click to select one.</p>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} mt={5} alignItems="right">
                        <Button component="label" variant="contained">
                            Upload file
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => this.handleImageSelect(e)}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}