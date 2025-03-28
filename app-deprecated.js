require('dotenv').config()
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { CONSTANTS } = require('./src/constants')

const PORT = process.env.PORT || 3008
const staticFiles = CONSTANTS.STATIC_FILES

// Configure express and socket.io
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: { origin: '*' }
})

// Storing messages in memory
const messages = []

app.use(express.static(staticFiles))

// Handle client connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    // Send message history to the new user
    socket.emit('chat history', messages)

    // Message listener
    socket.on('chat message', (msg) => {
        const messageData = {
            userId: socket.id,
            text: msg,
        }

        messages.push(messageData)

        // Broadcast the message to all clients
        io.emit('chat message', messageData)
    })
})

// Start the server
server.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})