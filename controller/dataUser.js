const dataUser = require('../models/dataUser')
const objectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs')


exports.regis = (data) =>
    new Promise((resolve, reject) => {
        // console.log(data.nik)
        bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash
            console.log(data.password)

            dataUser.find({
                nik: data.nik
            }).then (hasil => {
                if (hasil.length > 0){
                    reject({
                        error: true,
                        msg: 'NIK sudah digunakan'
                    })
                } else {
                    dataUser.create(data)
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

exports.loginReg = (data) =>
    new Promise((resolve, reject) => {
        dataUser.findOne({
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
                        msg: 'Login berhasil',
                        data: res
                    })
                } else {
                    reject({
                        error: true,
                        msg: 'Password salah'
                    })
                }
            }
        })
    })

exports.getAllUser = () =>
    new Promise((resolve, reject) => {
        dataUser.find()
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

exports.updateUser = (data, id) =>
    new Promise((resolve, reject) =>{
        dataUser.updateOne({
            _id: id
        },data)
            .then(res =>{
                resolve({
                    error: false,
                    msg: 'Berhasil Mengubah Data'
                })
            }).catch(()=>{
            reject({
                error: false,
                msg: 'Gagal Mengubah Data'
            })
        })
    })

exports.deleteDataUser = (id) =>
    new Promise((resolve, reject) => {
        dataUser.deleteOne({
            _id: Object(id)
        }).then(()=>{
            resolve({
                error: false,
                msg: 'Berhasil Menghapus Data',
            })
        }).catch(()=>{
            reject({
                error: true,
                msg: 'Gagal Menghapus Data',
            })
        })
    })

// ANDROID ONLY
exports.getByNik = (nik) =>
    new Promise((resolve, reject) => {
        dataUser.findOne({
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

exports.getUserById = (id) =>
    new Promise((resolve, reject) => {
        dataUser.findOne({
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
