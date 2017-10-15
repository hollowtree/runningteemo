const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
// db.once('openUri', function () {
//     console.log('open!')
// })

var kittySchema = mongoose.Schema({
    name: String,
    age: Number
}, {
        autoIndex: true,
        timestamps: {
            createAt: 'created_at'
        }
    })
kittySchema.methods.speak = function () {
    var greeting = this.name ? 'Meow name is ' + this.name : 'I don\'t have a name'
    console.log(greeting)
}
var kitten = mongoose.model('Kitten', kittySchema)

// var silence = new kitten({ name: 'Teemo' })




// silence.save(function (err, fluffy) {
//     if(err) return console.error(err)
//     silence.speak();
// })


// kitten.find(function (err,kittens) {
//     if(err) return console.error(err)
//     console.log(kittens)
// })

// kitten.find({name:/^T/}, function (err,kittens) {
//     if(err) return console.log(err)
//     console.log(kittens[1].createdAt);

// })

const update = async (name, age) => {
    kitten.findOneAndUpdate({ name: name }, { $set: { age: age } }, function (err, kittens) {
        if (err) return console.error(err)
        console.log(kittens)
    })
}

update('To5m', 23)
