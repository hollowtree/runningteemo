const mongoose = require('mongoose')
const config = require('./db.conf')

mongoose.connect(config.address, {
    user: config.user,
    pass: config.pass
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('open!')
})