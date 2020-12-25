const dataAdmin = require('../models/dataAdmin')
const objectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs')

exports.regisAdmin = (data) =>
    new Promise((resolve, reject) => {
            // console.log(data.username)
            bcrypt.hash(data.password, 10, (err, hash) => {
                data.password = hash
                console.log(data.password)

                dataAdmin.find({
                    username: data.username
                }).then (hasil => {
                    if (hasil.length > 0){
                        reject({
                            error: true,
                            msg: 'Username sudah digunakan'
                        })
                    } else {
                        dataAdmin.create(data)
                            .then(res => {
                                resolve({
                                    error: true,
                                    msg: 'Regis Admin berhasil'
                                })
                            })
                            .catch(() => {
                                reject({
                                    error: false,
                                    msg: 'Regis Admin gagal'
                                })
                            })
                    }
                })
            })
        }
    )

exports.loginAdmin = (data) =>
    new Promise((resolve, reject) => {
        dataAdmin.findOne({
            username: data.username
        }).then (res => {
            console.log(res)
            if (res === null) {
                reject({
                    error: true,
                    msg: 'Username tidak ditemukan'
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

exports.getAllAdmin = () =>
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
                        nama: res[i].nama,
                        tglLahir: tgl[0],
                        username: res[i].username,
                        kodeRole: res[i].kodeRole,
                        password: res[i].password,
                        alamat: res[i].alamat,
                        notlp: res[i].notlp,
                    })
                }
                console.log(newData)
                resolve({ error: false, msg: 'Berhasil mengambil Data Admin',
                    data: newData
                })
            }).catch(() => {
            reject({ error: true, msg: 'Gagal mengambil Data Admin' })
        })
    })

exports.getAdminById = (id) =>
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

exports.updateDataAdmin = (data, id) =>
    new Promise((resolve, reject) =>{
        dataAdmin.updateOne({
            _id: id
        },data)
            .then(res =>{
                resolve({
                    error: false,
                    msg: 'Berhasil mengubah Data Admin'
                })
            }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal mengubah Data Admin'
            })
        })
    })

exports.deleteDataAdmin = (id) =>
    new Promise((resolve, reject) => {
        dataAdmin.deleteOne({
            _id: Object(id)
        }).then(()=>{
            resolve({
                error: false,
                msg: 'Berhasil menghapus Data Admin',
            })
        }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal menghapus Data Admin',
            })
        })
    })