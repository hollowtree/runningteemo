const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', {
    // promiseLibrary: global.Promise
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('open!')
})


const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: String,
    author: String,
    type: Number
}, {
        timestamps: {
            // createdAt: 'created_at'
        }
    })

articleSchema.methods.success = function () {
    console.log('Article save success')

}

var ArticleModel = mongoose.model('article', articleSchema)

async function up() {
    let res = await ArticleModel.findByIdAndUpdate('59d52824193fc010b8e1544a', { type: 0 })
    // res = res.toObject()
    console.log(res, res.hasOwnProperty('author'))
}
up()
