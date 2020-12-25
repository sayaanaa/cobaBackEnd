const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dataLahanSchema = new Schema ({
    nik: {
        type: Number,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    luasLahan: {
        type: String,
        required: true
    },
    koordinat: [
        {
            Latitude: Number,
            Longitude: Number
        }
    ],
    jenisTanaman: {
        type: String,
        required: true
    },
    tanggalTanam: {
        type: Date,
        required: true
    },
    usiaTanam: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('dataLahan', dataLahanSchema)