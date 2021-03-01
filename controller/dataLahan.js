const dataLahan = require('../models/dataLahan')
const objectId = require('mongoose').Types.ObjectId
const geolib = require('geolib')
const panenModel = require('../models/dataPanen')
// const adminModel = require('../models/dataAdmin')

exports.inputDataLahan = (data) =>
    new Promise((resolve, reject) => {
                // console.log(data)
                    let cariKoordinat
                        cariKoordinat = data.koordinat.map(r => {
                            let datas = {lat: r.Latitude, longi: r.Longitude}
                            return Object.values(datas)
                        })
                    const luasLahan = geolib.getAreaOfPolygon(cariKoordinat).toFixed(2)
                    data.luasLahan = luasLahan
                dataLahan.create(data)
                    .then(res => {
                             resolve({
                                error: false,
                                msg: 'Data Lahan berhasil ditambahkan!'})
                        // })
                    }).catch(() => {
                        reject({
                            error: true,
                            msg: 'Data Lahan gagal ditambahkan!'})
                })
    })

exports.getDataLahan = () =>
    new Promise((resolve, reject) => {
        dataLahan.find()
            .then(res => {
                resolve({
                    error: false,
                    msg: 'Berhasil mengambil data',
                    data: res
                })
            }).catch(() => {
            reject({
                error: true,
                msg: 'Gagal mengambil data'
            })
        })
    })

// exports.getUsiaTanam = () =>
//     new Promise((resolve, reject) => {
//         panenModel.aggregate([
//             {
//                 $lookup:
//                     {
//                         from: "datalahans",
//                         localField: "idLahan",
//                         foreignField: "idLahan",
//                         as: "data"
//                     }
//             },
//             {
//                 $unwind:
//                     {
//                         path: "$data",
//                             // includeArrayIndex: "",
//                         preserveNullAndEmptyArrays: true
//                     }
//             }
//         ]).then(res => {
//                 resolve({
//                     error: false,
//                     msg: 'Berhasil mengambil data',
//                     data: res
//                 })
//             }).catch(() => {
//             reject({
//                 error: true,
//                 msg: 'Gagal mengambil data'
//             })
//         })
//     })

// exports.usiaTanam = () =>
//     new Promise((resolve, reject) => {
//         panenModel.find({
//             // idLahan: idLahan
//             // // tglTanam: tglTanam
//         })
//             .then(res => {
//                 const getDiffDate = (getDate) => {
//                     var now = moment(new Date());
//                     var end = moment(getDate);
//                     var duration = moment.duration(now.diff(end))
//                     var days = Math.floor(duration.asDays())
//                     // console.log("Usia Tanam + "+days+" hari")
//                     // console.log(end)
//                 }
//                 for (x in res) {
//                     getDiffDate(res[x].tglTanam)
//                 }
//                 resolve({
//                     error: false,
//                     msg: 'Berhasil menghitung usia tanam',
//                     data: res
//                 })
//             })
//             .catch(() => {
//                 reject({
//                     error: true,
//                     msg: 'Gagal menghitung usia tanam'
//                 })
//             })
//     })
// exports.getDataLahan = () =>
//     new Promise((resolve, reject) => {
//         dataLahan.find()
//             .then(res => {
//                 let cariKoordinat
//                 let newData = res.map(r=>{
//                     cariKoordinat = r.koordinat.map(data => {
//                             let datas = {lat: data.Latitude, longi: data.Longitude}
//                             return Object.values(datas)
//                         })
//                     return {
//                         luasLahan: geolib.getAreaOfPolygon(cariKoordinat).toFixed(2),
//                         nik: r.nik,
//                         nama: r.nama,
//                         idLahan: r.idLahan,
//                         koordinat: r.koordinat,
//                         alamatLahan: r.alamatLahan,
//                         _id: r._id
//                     }
//                 })
//                 // console.log(cariKoordinat)
//                 resolve({
//                     error: false,
//                     msg: 'Berhasil mengambil Data Lahan',
//                     data: newData
//                 })
//             })
//             .catch((err) => {
//                 reject({
//                     error: true,
//                     msg: 'Gagal mengambil Data Lahan'
//                 })
//                 // console.log(err)
//         })
//     })

// ANDROID ONLY
exports.getLahanByNik = (nik) =>
    new Promise((resolve, reject) => {
        dataLahan.find({
            nik: nik
        })
            .then(res => {
                resolve({
                    error: false,
                    msg: 'Berhasil mengambil data',
                    data: res
                })
            }).catch(() => {
            reject({
                error: true,
                msg: 'Gagal mengambil data'
            })
        })
    })


// ANDROID ONLY
exports.updateDataLahan = (data, idLahan) =>
    new Promise((resolve, reject) =>{
        // let cariKoordinat
        // cariKoordinat = data.koordinat.map(r => {
        //     let datas = {lat: r.Latitude, longi: r.Longitude}
        //     return Object.values(datas)
        // })
        // const luasLahan = geolib.getAreaOfPolygon(cariKoordinat).toFixed(2)
        // data.luasLahan = luasLahan
        //
        dataLahan.updateOne({
            idLahan: idLahan
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

// ANDROID ONLY
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

exports.getPanen = (nik) =>
    new Promise((resolve, reject) => {
        console.log(nik)
        dataLahan.aggregate([{
            $match: {
                nik: Number(nik),
            },
        },
            {
                $lookup:
                    {
                        from: "datapanens",
                        localField: "idLahan",
                        foreignField: "idLahan",
                        as: "data"
                    }
            },
            {
                $unwind:
                    {
                        path: "$data",
                        // includeArrayIndex: "",
                        preserveNullAndEmptyArrays: true
                    }
            }
        ]).then(res => {
            // console.log(res)
                resolve({
                    error: false,
                    msg: 'Berhasil mengambil data',
                    data: res
                })
            console.log(data)
        }).catch(() => {
            reject({
                error: true,
                msg: 'Gagal mengambil data'
            })
        })
    })
