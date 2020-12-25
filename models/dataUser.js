const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataUserSchema = new Schema({
    nik: {
        type: Number,
        index: {
            unique: true
        }
    },
    nama: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    notlp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('dataUsers', dataUserSchema)