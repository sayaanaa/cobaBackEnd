const dataLahan = require('express')()
const lahansController = require('../controller/dataLahan')

dataLahan.post('/inputDataLahan', (req, res) => {
    lahansController.inputDataLahan(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataLahan.get('/getDataLahan', (req, res) => {
    lahansController.getDataLahan()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataLahan.put('/updateDataLahan/:id', (req, res)=>{
    dataLahan.updateDataLahan(req.body, req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataLahan.delete('/deleteDataLahan/:id', (req, res) => {
    lahansController.deleteDataLahan(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = dataLahan