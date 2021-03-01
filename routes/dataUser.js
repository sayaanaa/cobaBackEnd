const dataUser = require('express')()
const usersController = require('../controller/dataUser')

// ANDROID ONLY
dataUser.post('/regis', (req, res) => {
    usersController.regis(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
    })

// ANDROID ONLY
dataUser.post('/loginReg', (req, res) => {
    usersController.loginReg(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataUser.post('/tambahUser', (req, res) => {
    usersController.regis(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataUser.get('/getAllUser', (req, res) => {
    usersController.getAllUser()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// ANDROID ONLY
dataUser.get('/getByNik/:nik', (req, res) => {
    usersController.getByNik(req.params.nik)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataUser.get('/getUserById/:id', (req, res) => {
    usersController.getUserById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataUser.put('/updateDataUser/:id', (req, res) => {
    usersController.updateUser(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataUser.delete('/deleteDataUser/:id', (req, res) => {
    usersController.deleteDataUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = dataUser
