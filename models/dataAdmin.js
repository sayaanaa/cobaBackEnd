const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataAdminSchema = new Schema({
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
    tglLahir: {
        type: Date,
        required: true
    },
    kodeRole: {
        type: Number,
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

module.exports = mongoose.model('dataAdmins', dataAdminSchema)
