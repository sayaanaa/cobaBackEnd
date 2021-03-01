const server = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require ('cors')
const port = 5050

// const mongoURI = 'mongodb://192.168.18.37:27017/pemetaan'
// const mongoURI = 'mongodb://127.0.0.1:27017/pemetaan'
// const mongoURI = 'mongodb://192.168.43.101:27017/pemetaan'
const mongoURI = 'mongodb://pemetaan:pemetaan@103.230.48.151:27017/pemetaan'

server.use(cors())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connect to db succsess')
}).catch(err => {
    console.log('Error : ' + err)
})

server.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

//list server
server.use('/user', require('./routes/user'))
server.use('/dataAdmin', require('./routes/dataAdmin'))
server.use('/dataUser', require('./routes/dataUser'))
server.use('/dataLahan', require('./routes/dataLahan'))
server.use('/dataPanen', require('./routes/dataPanen'))

server.listen(port, function() {
    console.log('Server started on port' + port)
})
