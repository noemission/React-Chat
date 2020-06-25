var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const broadCastNumberOfClients = () => {
    const numberOfClients = Object.keys(io.sockets.connected).length;
    io.emit("ONLINE_COUNT", numberOfClients)

}

io.on('connection', (socket) => {
    console.log('a user connected');
    broadCastNumberOfClients();

    socket.on('disconnect', () => broadCastNumberOfClients())
    socket.on('SEND_MESSAGE', data => {
        console.log(data)
        io.emit("UPDATE_MESSAGE_LIST", data)
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});