const mongoose = require('mongoose')


var fileSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    filesize: {
        type: Number,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required:true
    },
    sender: {
        type: String,
        required: false
    },
    receiver: {
        type: String,
        required: false
    }

 }, { timestamps: true });

module.exports = mongoose.model('file', fileSchema);