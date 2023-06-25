const express = require("express");
const multer = require('multer');

const PORT = process.env.PORT || 8888;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.listen(PORT, () => {

    app.post("/image/upload", upload.single('file'), (req, res) => {
        const sourcePath = req.file.path;
        const destinationPath = 'your/destination/folder/' + req.file.originalname;
        
        console.log(req.file)
    })

});