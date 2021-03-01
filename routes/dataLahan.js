const dataLahan = require('express')()
const lahansController = require('../controller/dataLahan')

// ANDROID ONLY
dataLahan.post('/inputDataLahan', (req, res) => {
    console.log(req.body)
    lahansController.inputDataLahan(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataLahan.get('/getDataLahan', (req, res) => {
    lahansController.getDataLahan()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


dataLahan.get('/getUsiaTanam', (req, res) => {
    lahansController.getUsiaTanam()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataLahan.get('/getPanen/:nik', (req, res) => {
    lahansController.getPanen(req.params.nik)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// ANDROID ONLY
dataLahan.get('/getLahanByNik/:nik', (req, res) => {
    lahansController.getLahanByNik(req.params.nik)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


// ANDROID ONLY
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
