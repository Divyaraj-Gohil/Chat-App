import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['https://divyaraj-gohil.github.io', 'https://divyaraj-gohil-chat.netlify.app', 'http://localhost:5173'],
        methods: ['GET', 'POST'],
        credentials: true
    }
})
export const getReceiveSocketId = (recevierId) => {
    return map[recevierId]
}

const map = {}

io.on('connection', (socket) => {
    // console.log('connected', socket.id)
    const userId = socket.handshake.query.userId
    if (userId !== undefined) {
        map[userId] = socket.id
    }
    io.emit('onlineUser', Object.keys(map))

    socket.on('disconnect', () => {
        // console.log("disconnected", socket.id)
        delete map[userId]
        // console.log(map)
        io.emit('onlineUser', Object.keys(map))
    })

})

export { app, io, server } 