const user = require('../models/user')
const objectId = require('mongoose').Types.ObjectId
const geoLib = require('geolib')

exports.input = (data) =>
new Promise ((resolve, reject) => {
    console.log(data.Id_User)
    user.find({
        Id_User: data.Id_User
    }).then (hasil => {
        if (hasil.length > 0) {
            reject({
                error: true,
                pesan: 'Id User sudah digunakan'
            })
        } else {
            user.create(data)
            .then (res => {
                resolve({
                    error: false,
                    pesan: 'Input data berhasil'
                })
            })
            .catch(() => {
                reject({
                    error: false,
                    pesan: 'Input Data Gagal'
                })
            })
        }
    })
})

exports.updateKoordinat = (id, data) =>
    new Promise (async(resolve, reject) => {
        user.update({
            _id : objectId(id)
        },
        {$addToSet : data}
        ).then(() => {
            resolve({
                error: false,
                pesan: 'Input data berhasil'
            })
        })
    })

exports.getData = () =>
new Promise((resolve, reject) => {
    user.findOne()
    .then(res => {
        let arr = []
        let dataKoordinat = res.Koordinat.map(r=>{
            let data = {lat: r.Latitude, longi: r.Longitude}
            return Object.values(data)
        })
        console.log(dataKoordinat)
        resolve({
        error: false,
        pesan: 'Mengambil Data Succsess',
        data: geoLib.getAreaOfPolygon(dataKoordinat)
        })
    })
    .catch(() => {
        reject({
        error: false,
        pesan: 'Mengambil Data Error'
        })
    })
})