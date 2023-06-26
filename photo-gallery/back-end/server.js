const express = require("express");
const multer = require('multer');
const fs = require('fs');

const PORT = process.env.PORT || 8888;

const app = express();
const upload = multer({ dest: 'uploads/' });

const filePath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/image-data.json';
let imageJsonData = [];

function randomNumAssignment() {
    const RANDOM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const RANDOM_LENGTH = RANDOM.length;
    let randomAssignment = ' ';
    for (let i = 0; i < 10; i++) {
        randomAssignment += RANDOM.charAt(Math.floor(Math.random() * RANDOM_LENGTH));
    }
    return randomAssignment;
}

function addImageData(newData) {
    imageJsonData.push(newData);
}

app.listen(PORT, () => {

    app.post("/image/upload", upload.single('file'), (req, res) => {
        const newImgName = 'IMG-' + randomNumAssignment() + '.JPG';

        if (req.file.mimetype.startsWith('image/')) {
            const sourcePath = req.file.path;
            const destinationPath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/dropzone-save-photo/' + newImgName;
            fs.rename(sourcePath, destinationPath, (error) => {
                if (error) {
                    console.error('error moving file:', error);
                    res.send({ success: false })
                } else {
                    console.error('successfully moved file');
                    res.send({ success: true })
                }
            });

            addImageData({ file_real_name: req.file.originalname, alternative_name: newImgName })

            const jsonToString = JSON.stringify(imageJsonData, null, 1);

            fs.writeFile(filePath, jsonToString, 'utf8', (err) => {
                if (err) {
                    console.error('something went wrong!', err);
                } else {
                    console.log('file updated successfully!');
                }
            });
        } else {
            res.send({ success: false })
        }
    })

    app.post("/image/all", (req, res) => {
        fs.readFile('/Users/tina/Documents/react-projects/photo-gallery/back-end/image-data.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.send({ success: false });
            } else {
                const parsedJson = JSON.parse(data);
                res.send(parsedJson);
            }
        })
    })

});