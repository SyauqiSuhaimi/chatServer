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

const memberList = []

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`)

    socket.on('message', data =>{
        socket.broadcast.emit('message:received', data)
    })

    socket.on('members', data =>{

        const  newMember = {
            id : socket.id,
            memberName : data
        }
        
        memberList.push(newMember)
        console.log(memberList)
        socket.broadcast.emit('updateMembers', memberList)
        
    })

    socket.on('disconnect', () => {

        var index = memberList.map(x => {
            return x.id;
          }).indexOf(socket.id);

          memberList.splice(index, 1);
          socket.broadcast.emit('updateMembers', memberList)
          console.log(memberList)

        console.log(`user ${socket.id} disconnect.`)

    })
})

server.listen(3000, () => {
    console.log('Chat server run on 3000')
})