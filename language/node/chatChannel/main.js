const events = require('events')
const net = require('net')
const channel = new events.EventEmitter()

channel.clients = {}
channel.subscriptions = {}
channel.on('join', function (id, client) {
    this.clients[id] = client
    this.subscriptions[id] = (senderId, message) => {
        this.clients[id].write(id != senderId ? message : `Others will receive your message.\r\n`)
    }
    this.on('broadcast', this.subscriptions[id])
    client.write(`Welcome! Guests online: ${this.listeners('broadcast').length}.\r\n`)
})
channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id])
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`)
})
channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'The server has shut down.\n')
    channel.removeAllListeners('broadcast')
})

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`
    channel.emit('join', id, client)
    console.log(`${id} ${client} joined.\n`)
    client.on('data', data => {
        data = data.toString()
        channel.emit('broadcast', id, data)
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown')
        }
    })
    client.on('close', () => {
        channel.emit('leave', id)
    })
})

server.listen(21567)