const dataAdmin = require('express')()
const adminsController = require('../controller/dataAdmin')

dataAdmin.post('/regisAdmin', (req, res) => {
    adminsController.regisAdmin(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.post('/loginAdmin', (req, res) => {
    adminsController.loginAdmin(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.get('/getAllAdmin', (req, res) => {
    adminsController.getAllAdmin()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.get('/getAdminById/:id', (req, res) => {
    adminsController.getAdminById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataAdmin.delete('/deleteDataAdmin/:id', (req, res) => {
    adminsController.deleteDataAdmin(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = dataAdmin