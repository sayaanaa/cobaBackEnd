const dataPanen = require('express')()
const panensController = require('../controller/dataPanen')

dataPanen.post('/inputDataPanen', (req, res) => {
    console.log(req.body)
    panensController.inputDataPanen(req.body)
        .then (result => res.json(result))
        .catch(err => res.json(err))
})

dataPanen.get('/getDataPanen', (req, res) => {
    panensController.getDataPanen()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataPanen.get('/getUsiaTanam/:mt', (req, res) => {
    panensController.getUsiaTanam(req.params.mt)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataPanen.get('/getPanenById/:id', (req, res) => {
    panensController.getPanenById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataPanen.get('/editPanenById/:id', (req, res) => {
    panensController.editPanenById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataPanen.get('/prediksi/:masaTanam/:idLahan/:tahun', (req, res) => {
    // console.log('a')
    panensController.prediksi(req.params.masaTanam, req.params.idLahan, req.params.tahun)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// dataPanen.post('/prediksi/:idLahan/:masaTanam', (req, res) => {
//     panensController.test(req.params.masaTanam, req.params.idLahan)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// })

dataPanen.put('/updateDataPanen/:id', (req, res) => {
    panensController.updateDataPanen(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

dataPanen.delete('/deleteDataPanen/:id', (req, res) => {
    panensController.deleteDataPanen(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = dataPanen
