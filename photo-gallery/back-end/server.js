const express = require("express");
const multer = require('multer');
const fs = require('fs');

const PORT = process.env.PORT || 8888;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.listen(PORT, () => {

    app.post("/image/upload", upload.single('file'), (req, res) => {
        if (req.file.mimetype.startsWith('image/')) {
            const sourcePath = req.file.path;
            const destinationPath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/dropzone-save-photo/' + req.file.originalname;
            fs.rename(sourcePath, destinationPath, (error) => {
                if (error) {
                    console.error('Error moving file:', error);
                    res.send({ success: false })
                } else {
                    console.error('successfully moved file');
                    res.send({ success: true })
                }
            });

        } else {
            res.send({ success: false })
        }
    })

});