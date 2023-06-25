import React, { Component } from 'react';

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
      const imageInformation = {};

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.setState({
              droppedImage: e.target.result
            });
            imageInformation['path'] = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  render() {
    return (
      <>
        <div id="dropzone" className="dropzone"
          style={{ height: 200, border: 'dotted 1px gray', borderRadius: 10, padding: 20, margin: 10, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Drag and drop an image here.</span>
        </div>
      </>
    );
  }
}