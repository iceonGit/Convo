import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver];
};

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('user connected: ', socket.id);

    const username = socket.handshake.query.username;
    if (username) {
        userSocketMap[username] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
        delete userSocketMap[username];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, io, server };
