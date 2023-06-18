require('dotenv').config()
const File = require('./models/file')
var fs = require('fs');

async function cleanData() {
    console.log('Cleaning data started')
    const old_files = await File.find({ createdAt: { $lt: new Date(Date.now() - 24*60*60 * 1000) } })
    console.log(old_files.length)
    // for (const file of old_files) {
        
    //     console.log('AYUSHI')
    //     console.log(file.path)
    // } 
    if (old_files.length) {
        old_files.forEach(file => {
            console.log('AYUSHI')
            console.log(file)
            try {
                fs.unlinkSync(file.path) //removing old_files from uploads folder
                // await file.delete() //removing old_files from uploads mongodb
                console.log(file.uuid)
                File.deleteOne({ uuid: file.uuid }).then(() => {
                    console.log(`${file.filename} removed`)
                }).catch((err) => {
                    console.log(err)
                })
                console.log(`File ${file.filename} Removed!`)
            } catch (err) {
                console.log(err)
            }
        
       
        });
    }
    console.log('job done')
    // old_files.forEach(file => {
    //     fs.unlinkSync(file.path)
    //     await file.remove()
        
    // });
    
}

module.exports = cleanData;