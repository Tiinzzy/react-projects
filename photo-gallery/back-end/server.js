const express = require("express");
const multer = require('multer');
const fs = require('fs');
var base64Img = require('base64-img');

const PORT = process.env.PORT || 8888;

const app = express();
const upload = multer({ dest: '/Users/tina/Documents/react-projects/photo-gallery/back-end/images/' });

const filePath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/image-data.json';
let imageJsonData = {};

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
    imageJsonData[newData.file_real_name] = newData;
}

app.listen(PORT, () => {

    app.post("/image/upload", upload.single('file'), (req, res) => {
        const newImgName = randomNumAssignment() + '.JPG';

        if (req.file.mimetype.startsWith('image/')) {
            const sourcePath = req.file.path;
            const destinationPath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/images/' + newImgName.trim();
            fs.rename(sourcePath, destinationPath, (error) => {
                if (error) {
                    console.error('error moving file:', error);
                    res.send({ success: false })
                } else {
                    // console.error('successfully moved file');
                    res.send({ success: true })
                }
            });

            addImageData({ file_real_name: req.file.originalname, alternative_name: newImgName.trim() })

            const jsonToString = JSON.stringify(imageJsonData, null, 2);

            fs.writeFile(filePath, jsonToString, 'utf8', (err) => {
                if (err) {
                    console.error('something went wrong!', err);
                } else {
                    // console.log('file updated successfully!');
                }
            });
        } else {
            res.send({ success: false })
        }
    })

    app.post("/image/all", (req, res) => {
        let filePath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/image-data.json';
        const jsonData = fs.readFileSync(filePath, 'utf-8');

        const parsedJson = JSON.parse(jsonData);

        for (let i in parsedJson) {
            let regularPath = '/Users/tina/Documents/react-projects/photo-gallery/back-end/images/' + parsedJson[i].alternative_name;
            const base64String = base64Img.base64Sync(regularPath);
            parsedJson[i].path = base64String
        }

        const updatedJsonData = JSON.stringify(parsedJson, null, 2);
        fs.writeFileSync(filePath, updatedJsonData);
        res.send(parsedJson);
    })

});