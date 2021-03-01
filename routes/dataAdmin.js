const dataAdmin = require('express')()
const adminsController = require('../controller/dataAdmin')

dataAdmin.post('/regis', (req, res) => {
    adminsController.regis(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.post('/login', (req, res) => {
    adminsController.login(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

// dataAdmin.get('/getAllData', (req, res) => {
//     adminsController.getAllData()
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// })

dataAdmin.get('/getData', (req, res) => {
    adminsController.getData()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// ANDROID ONLY
dataAdmin.get('/getByNik/:nik', (req, res) => {
    adminsController.getByNik(req.params.nik)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// dataAdmin.put('/updateData/:id', (req, res) => {
//     adminsController.updateData(req.params.id, req.body)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// })

dataAdmin.put('/update/:nik', (req, res) => {
    adminsController.update(req.params.nik, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.delete('/deleteData/:nik', (req, res) => {
    adminsController.deleteData(req.params.nik)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.get('/getUserById/:id', (req, res) => {
    adminsController.getUserById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// dataAdmin.get('/getAdminById/:id', (req, res) => {
//     adminsController.getAdminById(req.params.id)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// })

module.exports = dataAdmin
