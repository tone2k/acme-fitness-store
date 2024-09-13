import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // TODO: revisit this url

export const socket: Socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'],
    autoConnect: false,
});

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
});

socket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
});

