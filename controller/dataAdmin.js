const dataAdmin = require('../models/dataAdmin')
const objectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs')

exports.regis = (data) =>
    new Promise((resolve, reject) => {
            // console.log(data.username)
            bcrypt.hash(data.password, 10, (err, hash) => {
                data.password = hash
                console.log(data.password)

                dataAdmin.find({
                    nik: data.nik
                }).then (hasil => {
                    if (hasil.length > 0){
                        reject({
                            error: true,
                            msg: 'NIK sudah digunakan'
                        })
                    } else {
                        dataAdmin.create(data)
                            .then(res => {
                                resolve({
                                    error: false,
                                    msg: 'Registrasi berhasil'
                                })
                            })
                            .catch(() => {
                                reject({
                                    error: true,
                                    msg: 'Registrasi gagal'
                                })
                            })
                    }
                })
            })
        }
    )

exports.login = (data) =>
    new Promise((resolve, reject) => {
        console.log(data)
        dataAdmin.findOne({
            nik: data.nik
        }).then (res => {
            console.log(res)
            if (res === null) {
                reject({
                    error: true,
                    msg: 'NIK tidak ditemukan'
                })
            } else {
                let passwordhash = res.password
                if(bcrypt.compareSync(data.password, passwordhash)){
                    resolve({
                        error: false,
                        msg: 'Berhasil masuk lek',
                        data: res
                    })
                } else {
                    reject({
                        error: true,
                        msg: 'Passwordmu salah lek'
                    })
                }
            }
        })
    })

exports.getData = () =>
    new Promise((resolve, reject) => {
        dataAdmin.find()
            .then(res => {
                var newData = []
                var tgl
                for (i in res){
                    tgl = res[i].tglLahir.toLocaleString().split(",")
                    console.log(tgl)
                    newData.push({
                        _id: res[i]._id,
                        nik: res[i].nik,
                        nama: res[i].nama,
                        tglLahir: tgl[0],
                        kodeRole: res[i].kodeRole,
                        password: res[i].password,
                        alamat: res[i].alamat,
                        notlp: res[i].notlp,
                    })
                }
                console.log(newData)
                resolve({ error: false, msg: 'Berhasil mengambil Data',
                    data: newData
                })
            }).catch(() => {
            reject({ error: true, msg: 'Gagal mengambil Data' })
        })
    })

// exports.updateData = (data, id) =>
//     new Promise((resolve, reject) =>{
//         dataAdmin.updateOne({
//             _id : Object(id)
//         })
//             .then(res =>{
//                 resolve({
//                     error: false,
//                     msg: 'Berhasil mengubah Data'
//                 })
//             }).catch(()=>{
//             reject({
//                 error: true,
//                 msg: 'Gagal mengubah Data'
//             })
//         })
//     })

exports.update = (nik, data) =>
    new Promise((resolve, reject) =>{
        dataAdmin.updateOne({
            nik : nik
        }, data )
            .then(res => {
                resolve({
                    error: false,
                    msg: 'Berhasil Mengubah Data'
                })
            }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal Mengubah Data'
            })
        })
    })


exports.deleteData = (nik) =>
    new Promise((resolve, reject) => {
        dataAdmin.deleteOne({
            nik : nik
        }).then(() => {
            resolve({
                error: false,
                msg: 'Berhasil menghapus Data',
            })
        }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal menghapus Data',
            })
        })
    })

// ini untuk get petani by nik
exports.getByNik = (nik) =>
    new Promise((resolve, reject) => {
        dataAdmin.find({
            // _id : Object(id)
            nik : nik
        })
            .then(res => {
                var newData = []
                var tgl
                for (i in res){
                    tgl = res[i].tglLahir.toLocaleString().split(",")
                    console.log(tgl)
                    newData.push({
                        _id: res[i]._id,
                        nik: res[i].nik,
                        nama: res[i].nama,
                        tglLahir: tgl[0],
                        kodeRole: res[i].kodeRole,
                        password: res[i].password,
                        alamat: res[i].alamat,
                        notlp: res[i].notlp,
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


// exports.getAdminById = (id) =>
//     new Promise((resolve, reject) => {
//         dataAdmin.findOne({
//             _id: Object(id)
//         })
//             .then(res => {
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

// ini untuk edit data admin/petani
exports.getUserById = (id) =>
    new Promise((resolve, reject) => {
        dataAdmin.findOne({
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


