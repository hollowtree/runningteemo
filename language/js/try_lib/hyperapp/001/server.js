const liveServer = require('live-server')

liveServer.start({
    port: 8080,
    host: 'localhost',
    root: 'dist',
    open: true,
    ignore: 'src/*,node_modules/*',
    wait: 500,
    logLevel: 2
})
