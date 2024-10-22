const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// MongoDB Connection
mongoose.connect('mongodb://localhost/chatApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io logic here...
const Message = require('./models/Message');

io.on('connection', (socket) => {
    console.log('New WebSocket connection...');

    // Emit previous messages from the database when a new client connects
    Message.find().sort({ createdAt: 1 }).limit(10).exec((err, messages) => {
        if (err) {
            console.error(err);
        } else {
            socket.emit('previousMessages', messages);
        }
    });

    // Listen for new chat messages
    socket.on('chatMessage', (msgData) => {
        const newMessage = new Message({
            username: msgData.username,
            message: msgData.message
        });

        // Save the message to the database
        newMessage.save().then(() => {
            // Emit the message to all clients
            io.emit('message', newMessage);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
