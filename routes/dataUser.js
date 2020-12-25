const dataUser = require('express')()
const usersController = require('../controller/dataUser')

dataUser.post('/regis', (req, res) => {
    usersController.regis(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
    })

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

dataUser.get('/getNik', (req, res) => {
    usersController.getNik()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataUser.delete('/deleteDataUser/:id', (req, res) => {
    usersController.deleteDataUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = dataUser