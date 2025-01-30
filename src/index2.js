const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

const users = new Map();

// Serve the React Kanban app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Fallback to React's `index.html` for unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// WebSocket logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login',(username)=>{
        if(users.has(username)){
            socket.emit('loginError','Username already exists');
        }
        else{
            users.set(username,socket.id);
            console.log(`${username} logged in`);
            io.emit('userCount',users.size);
        }
    })
    socket.on('chatMessage', (message) => {
        console.log('From: ',socket.id,"Message: ",message)
        io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    
        for(const[username,id] of users.entries()){
            if(id === socket.id){
                users.delete(username);
                console.log(`${username} logged out`);
                break;
            }
        }
        io.emit('userCount',users.size);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
