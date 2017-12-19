const fs = require('fs')
const Koa = require('koa')
const KoaBodyParser = require('koa-bodyparser')
const KoaRouter = require('koa-router')()



const routerController = require('./router')

const app = new Koa()

app.use(async (ctx, next) => {
    // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    fs.appendFileSync('request.log', `${new Date(+new Date()+8*3600*1000).toISOString()} Process ${ctx.request.method} ${ctx.request.url}`)
    await next()
})


app.use(KoaBodyParser())

KoaRouter.get('/generate_pdf_from_url', routerController.generatePdfFromUrl())

app.use(KoaRouter.routes())

const server = app.listen(3000, function () {
    console.log('Server running on http://localhost:3000/')
    console.log(`This process's pid is ${process.pid}`);
})