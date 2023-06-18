//ROUTE TO DOWNLOAD FILE FROM SERVER (FROM UPLOADS FOLDER)

require('dotenv').config()
var express = require('express')
var router = express.Router()
const File = require('../models/file')

router.get('/:uuid', async function (req, res) {

    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
        res.json({ message: `File doesn't exist` })
    }
    else {
        // const filepath = file.path;
        console.log(file.filename)
        const filepath = `${__dirname}/../${file.path}`;
        res.download(filepath); // Set disposition and send it.
    }

});

module.exports=router