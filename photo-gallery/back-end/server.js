const express = require("express");
const multer = require('multer');
const fs = require('fs');

const PORT = process.env.PORT || 8888;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.listen(PORT, () => {

    app.post("/image/upload", upload.single('file'), (req, res) => {
        const sourcePath = req.file.path;
        const destinationPath = '/Users/tina/Documents/react-projects/photo-gallery/front-end/public/dropzone-save-photo/' + req.file.originalname;

        fs.rename(sourcePath, destinationPath, (error) => {
            if (error) {
                console.error('Error moving file:', error);
                res.status(500).send('Error moving file');
            } else {
                res.send('File uploaded and saved successfully');
            }
        });

        if (req.file.mimetype.startsWith('image/')) {
            return { success: true }
        }
    })

});