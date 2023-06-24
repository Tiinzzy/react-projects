import React, { Component } from 'react';
import { Dropzone } from 'dropzone';

class TestDropZone extends Component {
  componentDidMount() {
    // Check if Dropzone is already attached to the element
    if (!document.querySelector(".dropzone")) {
      // Initialize Dropzone when the component mounts
      this.initializeDropzone();
    }
  }

  initializeDropzone() {
    const dropzone = new Dropzone("div#myId", {
      url: "/file/post",
      acceptedFiles: "image/*", // Limit the accepted file types to images
      maxFiles: 1, // Limit the number of files to 1
      autoProcessQueue: false, // Disable automatic file processing
    });

    // Event handler for when a file is added
    dropzone.on("addedfile", function (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const image = new Image();
        image.src = event.target.result;

        // Display the dropped image in a div with the id "preview"
        document.getElementById("preview").appendChild(image);
      };

      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <div>
        <div id="myId" className="dropzone" style={{ border: 'dotted 1px gray', borderRadius: 10, padding: 20, margin: 10, textAlign: 'center' }}>
          <span>Drop an image here to upload.</span>
        </div>
        <hr/> 
        <div id="preview"></div>
      </div>
    );
  }
}

export default TestDropZone;