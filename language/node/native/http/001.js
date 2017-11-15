const http =require('http')
const hostname = '127.0.0.1'
const port =3000

const server = http.createServer((req,res)=>{
    console.log('req: ', req)
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(`
    <!doctype html>
    <html>
    <head>
    </head>
    <body>
    <p>Hello World</p>
    </body>
    </html>
    `)
    console.log('res: ', res)
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
    
})