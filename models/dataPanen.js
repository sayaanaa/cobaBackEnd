const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dataPanenSchema = new Schema ({
    idLahan: {
        type: Number,
        required: true
    },
    jenisTanaman: {
        type: String,
        required: true
    },
    tahun:{
        type: Number,
        required: true
    },
    tglTanam: {
        type: Date,
        required: true
    },
    masaTanam: {
        type: String,
        required: true
    },
    jmlPanen: {
        type: Number,
        default: 0.0
    }
})

module.exports = mongoose.model('dataPanens', dataPanenSchema)
