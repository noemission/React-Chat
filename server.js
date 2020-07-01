const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs')
const history = require('connect-history-api-fallback')

let usernames;
try {
    usernames = JSON.parse(fs.readFileSync('usernames.json'))
} catch (error) {
    fs.writeFileSync('usernames.json', JSON.stringify([]))
    usernames = []
}
usernames = new Set(usernames);

app.get('/available', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { username } = req.query

    if (username && !usernames.has(username)) {
        usernames.add(username)
        fs.writeFileSync('usernames.json', JSON.stringify(Array.from(usernames)))
        res.json(true)
    } else {
        res.json(false)
    }
});
app.use(history())
app.use(express.static('build'))

const broadCastNumberOfClients = () => {
    const numberOfClients = Object.keys(io.sockets.connected).length;
    io.emit("ONLINE_COUNT", numberOfClients)
}

io.on('connection', (socket) => {
    console.log('WS_SERVER :: a user connected');
    broadCastNumberOfClients();

    socket.on('disconnect', () => broadCastNumberOfClients())
    socket.on('SEND_MESSAGE', (data) => {
        const { username, text } = data
        io.emit("UPDATE_MESSAGE_LIST", {
            username,
            text,
            timestamp: new Date(),
            id: Math.random()
        })
    })
});

http.listen(3001, () => { 
    console.log('WS_SERVER :: started at http://localhost:3001');
});