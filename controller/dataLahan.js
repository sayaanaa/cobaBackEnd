const dataLahan = require('../models/dataLahan')
const objectId = require('mongoose').Types.ObjectId
const geolib = require('geolib')

exports.inputDataLahan = (data) =>
    new Promise((resolve, reject) => {
        console.log(data.nik)
        dataLahan.find({
            nik: data.nik
        }).then (hasil => {
            if (hasil.length > 0) {
                reject({
                    error: true,
                    msg: 'NIK sudah digunakan'
                })
            } else {
                dataLahan.create(data)
                    .then(res => {
                        resolve({
                            error: false,
                            msg: 'Data Lahan berhasil ditambahkan!'})
                    }).catch(() => {
                        reject({
                            error: true,
                            msg: 'Data Lahan gagal ditambahkan!'})
                })
            }
        })
    })

exports.getDataLahan = () =>
    new Promise((resolve, reject) => {
        dataLahan.find()
            .then(res => {
                let cariKoordinat
                let newData = res.map(r=>{
                    cariKoordinat = r.koordinat.map(data => {
                            let datas = {lat: data.Latitude, longi: data.Longitude}
                            return Object.values(datas)
                        })
                    return {
                        luasLahan: geolib.getAreaOfPolygon(cariKoordinat).toFixed(2),
                        nik: r.nik,
                        nama: r.nama,
                        koordinat: r.koordinat,
                        jenisTanaman: r.jenisTanaman,
                        tanggalTanam: r.tanggalTanam,
                        usiaTanam: r.usiaTanam,
                        _id: r._id
                    }
                })

                resolve({
                    error: false,
                    msg: 'Berhasil mengambil Data Lahan',
                    data: newData
                })
            })
            .catch((err) => {
                reject({
                    error: true,
                    msg: 'Gagal mengambil Data Lahan'
                })
                // console.log(err)
        })
    })

exports.updateDataLahan = (data, id) =>
    new Promise((resolve, reject) =>{
        dataLahan.updateOne({
            _id: id
        },data)
            .then(res =>{
                resolve({
                    error: false,
                    msg: 'Berhasil mengubah Data Lahan'
                })
            }).catch(()=>{
            reject({
                error: false,
                msg: 'Gagal mengubah Data Lahan'
            })
        })
    })

exports.deleteDataLahan = (id) =>
    new Promise((resolve, reject) => {
        dataLahan.deleteOne({
            _id: Object(id)
        }).then(()=>{
            resolve({
                error: false,
                msg: 'Berhasil menghapus Data Lahan',
            })
        }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal menghapus Data Lahan',
            })
        })
    })