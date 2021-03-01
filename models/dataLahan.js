const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const dataLahanSchema = new Schema ({
    nik: {
        type: Number,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    idLahan: {
        type: Number,
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
    alamatLahan: {
        type: String,
        required: true
    }
})

autoIncrement.initialize(mongoose.connection)
dataLahanSchema.plugin(autoIncrement.plugin, {
    model: 'dataLahan',
    field: 'idLahan',
    startAt: 1004,
    incrementBy: 1,
})

module.exports = mongoose.model('dataLahan', dataLahanSchema)
