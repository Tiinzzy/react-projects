const express = require("express");
const multer = require('multer');
const fs = require('fs');
const base64Img = require('base64-img');

const app = express();
const PORT = process.env.PORT || 8888;

const IMAGE_DIRECTORY = '/Users/tina/Documents/react-projects/photo-gallery/back-end/images/';
const FILE_PATH = '/Users/tina/Documents/react-projects/photo-gallery/back-end/image-data.json';

const upload = multer({ dest: IMAGE_DIRECTORY });

function randomNumAssignment() {
    const RANDOM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const RANDOM_LENGTH = RANDOM.length;
    let randomAssignment = ' ';
    for (let i = 0; i < 10; i++) {
        randomAssignment += RANDOM.charAt(Math.floor(Math.random() * RANDOM_LENGTH));
    }
    return randomAssignment;
}

function getCurrentImageData() {
    let jsonData = fs.readFileSync('image-data.json', 'utf-8');
    let parsed = JSON.parse(jsonData);
    return parsed
}

app.listen(PORT, () => {

    app.post("/image/upload", upload.single('file'), (req, res) => {
        const newImgName = randomNumAssignment() + '.JPG';

        if (req.file.mimetype.startsWith('image/')) {
            const sourcePath = req.file.path;
            const destinationPath = IMAGE_DIRECTORY + newImgName.trim();
            fs.rename(sourcePath, destinationPath, (error) => {
                if (error) {
                    console.error('error moving file:', error);
                    res.send({ success: false });
                } else {
                    res.send({ success: true });
                }
            });

            const imageJsonData = getCurrentImageData();
            imageJsonData[req.file.originalname] = { file_real_name: req.file.originalname, alternative_name: newImgName.trim() };
            const jsonToString = JSON.stringify(imageJsonData);

            fs.writeFileSync(FILE_PATH, jsonToString, 'utf8', (err) => {
                if (err) {
                    console.error('something went wrong!', err);
                }
            });

        } else {
            res.send({ success: false });
        }
    })

    app.post("/image/all", (req, res) => {
        const parsedJson = getCurrentImageData();

        for (let i in parsedJson) {
            let regularPath = IMAGE_DIRECTORY + parsedJson[i].alternative_name;
            const base64String = base64Img.base64Sync(regularPath);
            parsedJson[i].file = base64String;
        }

        res.send(parsedJson);
    })

});