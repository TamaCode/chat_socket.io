const { PORT } = require('./config.js'); 
const express = require('express');
const http = require('http');
const socket_io = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors())

const server = http.createServer(app);
const io = socket_io(server, {cors: {origin: "http://localhost:3000"}});

io.on('connection', (socket) => {
    
    socket.on("desde cliente", (arg) => { // RECIBO DESDE EL CLIENTE
        console.log(socket.id);
        console.log(arg);
        //socket.emit("desde server",  `el servidor confirma que recibio tu mensaje: ${arg} desde el cliente ID: ${socket.id}`);
        io.emit("desde server", `${arg}/${socket.id}`) // ENVIO DESDE EL SERVER
    })
});

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});