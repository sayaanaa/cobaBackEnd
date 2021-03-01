const dataPanen = require('../models/dataPanen')
const objectId = require('mongoose').Types.ObjectId
const moment = require('moment')
const lahanModel = require('../models/dataLahan')
const geolib = require('geolib')

exports.inputDataPanen = (data) =>
    new Promise((resolve, reject) => {
        dataPanen.create(data)
            .then(res => {
                resolve({
                    error: false,
                    msg: 'Data Panen berhasil ditambahkan!'})
            }).catch(() => {
            reject({
                error: true,
                msg: 'Data Panen gagal ditambahkan!'})
        })
    })

exports.getDataPanen = () =>
    new Promise((resolve, reject) => {
        dataPanen.find()
            .sort({tahun: -1})
            .then(res => {
                const getDiffDate = (getDate) => {

                    var now = moment(new Date()); // today Date
                    var end = moment(getDate); // another Date
                    var duration = moment.duration(now.diff(end))
                    var days = Math.floor(duration.asDays())
                    console.log("Usia Tanam + "+days+" hari")
                    // console.log(end)
                }

                for (x in res){
                    getDiffDate(res[x].tglTanam)
                }

                var newData = []
                var tglTanam
                for (i in res) {
                    tglTanam = res[i].tglTanam.toLocaleString().split(",")
                    console.log(tglTanam)
                    newData.push({
                        _id: res[i]._id,
                        idLahan: res[i].idLahan,
                        jenisTanaman: res[i].jenisTanaman,
                        tahun: res[i].tahun,
                        tglTanam: tglTanam[0],
                        masaTanam: res[i].masaTanam,
                        jmlPanen: res[i].jmlPanen,
                    })
                }

                resolve({
                    error: false,
                    msg: 'Berhasil mengambil data',
                    data: newData
                })
            }).catch(() => {
            reject({
                error: true,
                msg: 'Gagal mengambil data'
            })
        })
    })

exports.getPanenById = (idLahan) =>
    new Promise((resolve, reject) => {
        dataPanen.find({
            idLahan: idLahan
        })
            .sort({tahun: -1})
            .then(res => {
                var newData = []
                var tglTanam
                for (i in res) {
                    tglTanam = res[i].tglTanam.toLocaleString().split(",")
                    // console.log(tglTanam)
                    newData.push({
                        _id: res[i]._id,
                        idLahan: res[i].idLahan,
                        jenisTanaman: res[i].jenisTanaman,
                        tahun: res[i].tahun,
                        tglTanam: tglTanam[0],
                        masaTanam: res[i].masaTanam,
                        jmlPanen: res[i].jmlPanen,
                    })
                }

                resolve({
                    error: false,
                    msg: 'Berhasil mengambil data',
                    data: newData
                })
            }).catch(() => {
            reject({
                error: true,
                msg: 'Gagal mengambil data'
            })
        })
    })

exports.editPanenById = (id) =>
    new Promise((resolve, reject) => {
        dataPanen.findOne({
            _id: Object(id)
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

exports.prediksi = (masaTanam, idLahan, tahun) =>
    new Promise((resolve, reject) => {
        try {
            dataPanen.find({
                masaTanam: masaTanam,
                idLahan: idLahan,
                tahun: {
                    $lt: tahun,
                    $gte: tahun - 2
                }
            })
                .then(res => {
                    if (res.length > 0) {
                        let total = 0
                        for(i in res){
                            total += res[i].jmlPanen
                        }
                        resolve({
                            error: false,
                            msg: 'Berhasil',
                            data: (total/res.length).toFixed(1)
                        })
                    } else {
                        lahanModel.findOne({
                            idLahan: idLahan
                        }).then(res => {

                            if (res) {
                                resolve({
                                    error: false,
                                    msg: 'Berhasil Menghitung Prediksi Panen',
                                    data: ((res.luasLahan / 10000) * 4.770).toFixed(1)
                                })
                            } else {
                                reject({
                                    error: true,
                                    msg: "Tidak Ada Lahan/Panen Sebelumnya"
                                })
                            }
                        })
                    }
                }).catch(() => {
                reject({
                    error: true,
                    msg: 'Gagal mengambil data'
                })
            })
        } catch (e) {
            console.log(e)
        }
    })

exports.updateDataPanen = (id, data) =>
    new Promise((resolve, reject) =>{
        dataPanen.updateOne({
            _id: Object(id)
        }, data)
            .then(res =>{
                resolve({
                    error: false,
                    msg: 'Berhasil mengubah Data Panen'
                })
            }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal mengubah Data Panen'
            })
        })
    })


exports.deleteDataPanen = (id) =>
    new Promise((resolve, reject) => {
        dataPanen.deleteOne({
            _id: Object(id)
        }).then(()=>{
            resolve({
                error: false,
                msg: 'Berhasil menghapus Data Panen',
            })
        }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal menghapus Data Panen',
            })
        })
    })

// exports.getPanen = (nik) =>
//     new Promise((resolve, reject) => {
//         lahanModel.aggregate([
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
//                         // includeArrayIndex: "",
//                         preserveNullAndEmptyArrays: true
//                     }
//             }
//         ]).then(res => {
//             lahanModel.find({
//                 nik : nik
//             }).then(res => {
//                 resolve({
//                     error: false,
//                     msg: 'Berhasil mengambil data',
//                     data: res
//                 })
//             })
//         }).catch(() => {
//             reject({
//                 error: true,
//                 msg: 'Gagal mengambil data'
//             })
//         })
//     })

exports.getUsiaTanam = (masaTanam) =>
    new Promise((resolve, reject) => {
        dataPanen.aggregate([
            {$match: {tahun: new Date().getFullYear(), masaTanam : masaTanam}},
            {
                $lookup: {
                    from: "datalahans",
                    localField: "idLahan",
                    foreignField: "idLahan",
                    as: "dataLahan"
                }
            },
            {$unwind: {
                    path: "$dataLahan",
                    preserveNullAndEmptyArrays: true
                }}
        ]).then(res => {
            var newData

            newData = res.map(r=> {
                var now = moment(new Date()); // today Date
                var end = moment(r.tglTanam); // another Date
                var duration = moment.duration(now.diff(end))
                var days = Math.floor(duration.asDays())

                return {
                    usiaTanam : days,
                    jmlPanen: r.jmlPanen,
                    idLahan: r.idLahan,
                    jenisTanaman: r.jenisTanaman,
                    tahun: r.tahun,
                    tglTanam: r.tglTanam,
                    masaTanam: r.masaTanam,
                    dataLahan: r.dataLahan
                }
            })

            resolve({
                error: false,
                msg: 'Berhasil mengambil data',
                data: newData
            })
        }).catch((err) => {
            console.log(err)
            reject({
                error: true,
                msg: 'Gagal mengambil data'
            })
        })
    })


