//ROUTE TO MAIL FILE FROM SERVER (FROM UPLOADS FOLDER)

require('dotenv').config()
var express = require('express')
var router = express.Router()
const File = require('../models/file');


router.post('/:uuid', async function (req, res) {

    //req has uuid of file that we wish to mail,from,to,
    console.log('DEBUGGING')
    console.log(req.body)
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
        res.status(404).json({ message: `File doesn't exist` })
    }
    else {

        const emailFrom = req.body.from;
        const emailTo = req.body.to;
        // console.log(emailTo)
        // console.log(emailFrom)
        const link=`${process.env.BASE_URL}/download/${file.uuid}`

        const sendMail = require('../services/emailService');
        sendMail(
            emailFrom,
            emailTo,
            subject = `File Share`,
            text = 'Hello',
            html = `<p><strong>${emailFrom} has shared a file with you using ShareItOn App!<br><a href=${link}>Click Here</a> to download the file.
            <br> Note! The download link expires in 24 hours! </strong></p>`
        ).then(() => {
            res.render('mail_sent')
            // res.send(`Mail sent! <a href="/upload"> Click here</a> to return to Home Page`)
        }).catch((err) => {
            console.log(err.message)
            res.status(500).send('error occured')
        })

    }


});

module.exports = router