import React, { Component } from 'react';

import './test-style.css';

const BOX_STYLE = function (width) {
  return {
    display: "inline-block",
    height: width / 2.5,
    width: width,
    marginRight: 10,
    marginBottom: 10,
    border: "solid 1px darkred",
    textAlign: "center",
  };
};

export default class TestDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      droppedImage: null,
      imageInformation: {},
      width: 300
    }
  }

  componentDidMount() {
    const dropZone = document.getElementById('dropzone');

    window.addEventListener("resize", this.resizeWindow());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();

      const files = e.dataTransfer.files;
      const imageInformation = {};

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        imageInformation['name'] = file.name;

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
      this.setState({ imageInformation });
    });
  }

  resizeWindow() {
    let screenWidth = window.innerWidth * 0.95;
    this.setState({ width: screenWidth - 100 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow());
  }

  render() {
    return (
      <>
        <div id="dropzone" className="dropzone"
          style={{ height: 200, border: 'dotted 1px gray', borderRadius: 10, padding: 20, margin: 10, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Drag and drop an image here.</span>
        </div>
        <hr />
        <div id="preview" className="preview-container"
          // style={BOX_STYLE(this.state.width)}
        >
          {this.state.droppedImage && <img src={this.state.droppedImage} alt="Dropped" className="preview-image" width="500" height="500" />}
        </div>
      </>
    );
  }
}