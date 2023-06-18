//ROUTE TO UPLOAD FILE TO SERVER (IN UPLOADS FOLDER)

require('dotenv').config()
var express = require('express')
var router = express.Router()
const fileUpload = require('express-fileupload');
const File = require('../models/file')
const { v4: uuidv4 } = require('uuid');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.use(fileUpload()); //using fileUpload() middleware for uploading files


router.get('/', function (req, res) {
  //   res.send('Upload Router')
  res.render('upload_page')
})

router.post('/', async function (req, res) {
  // let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "myFile") is used to retrieve the uploaded file
  let myFile = req.files.myFile;

  // console.log("Ayushi")
  // console.log(myFile)

  uniqueName = `${Date.now()}-${parseInt(Math.random() * 1000000000)}-${myFile.name}`
  //so each file has unique name in uploads folder

  const uuid = uuidv4(); //to identify the file uniquely in database

  //Storing file in database
  const file = new File({
    filename: uniqueName,
    filesize: myFile.size,
    uuid: uuid,
    path: `uploads/${uniqueName}`
  })

  try {
    const response = await file.save()

    // const response = await file.save().then(() => {
    //   console.log('all ok')
    // }).catch((err) => {
    //   res.json(err.message)
    // })


    // uploadPath = __dirname + '/../uploads/' + myFile.name;
    uploadPath = __dirname + '/../uploads/' + uniqueName;

    // Use the mv() method to place the file somewhere on your server (path is in uploadPath)
    myFile.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
      //   res.send('File uploaded!');
    });
    //send download_page here instead
    const downloadLink = `${process.env.BASE_URL}/download/${response.uuid}`
    res.render('download_page', { downloadLink: downloadLink, uuid: response.uuid })
    // res.json({
    //   message: `File Uploaded!`,
    //   downloadLink: `${process.env.BASE_URL}/download/${response.uuid}`
    // })

  } catch (error) {
    res.status(500)
    return res.json(error.message);
  }

 
});


module.exports = router