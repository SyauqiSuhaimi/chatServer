const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:"*",
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`)

    socket.on('disconnect', () => {

        console.log(`user ${socket.id} disconnect.`)

    })
})

server.listen(3000, () => {
    console.log('Chat server run on 3000')
})