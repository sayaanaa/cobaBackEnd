const user = require('express')()
const usercont = require('../controller/user')

user.post('/input', (req, res) => {
    usercont.input(req.body)
    .then (result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

user.put('/update/:id', (req, res) => {
    usercont.updateKoordinat(req.params.id, req.body)
    .then (result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

user.get('/ambil', (req, res) => {
    usercont.getData(req.params.id)
    .then (result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = user