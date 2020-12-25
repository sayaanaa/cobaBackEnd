const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    ID_User: {
        type: String,
        required: true
    },
    Nama_User: {
        type: String
    },
    Alamat: {
        type: String
    },
    Koordinat: [
        {
            Latitude: Number,
            Longitude: Number
        }
    ]
})

module.exports = mongoose.model('user', userSchema)