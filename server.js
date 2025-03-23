const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer');
const {mergePDFs} = require('./merge');
const upload = multer({ dest: 'uploads/' })
const port = 3000;

app.use('/static', express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "template/index.html"));
});

// app.post("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "template/index.html"));
// });

app.post('/merge', upload.array('pdfs', 5), function (req, res, next) {
    console.log(req.files);
    mergePDFs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    // res.send({ data: req.files })
    res.redirect("http:/localhost:3000/")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
