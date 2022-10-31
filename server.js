const express = require("express");
const multer = require("multer");
const app = express();
app.use(express.static('public'));

var options = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

var upload = multer({ storage: options });

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/process', upload.single('mySingleFile'), (req, res) => {
    if (req.file) {
        res.send("<script>alert('File has been uploaded successfully!'); window.location.href = '/';</script>");
    } else {
        res.send("<script>alert('Please upload the file'); window.location.href = '/';</script>");
    }
});

app.post('/multiprocess', upload.array('myMultiFile', 3), (req, res) => {
    if (req.files.length != 0) {
        res.send("<script>alert('File has been uploaded successfully!'); window.location.href = '/';</script>");
    } else {
        res.send("<script>alert('Please upload the file'); window.location.href = '/';</script>");
    }
});

app.listen(8001, () => {
    console.log("Listening port 8001");
});