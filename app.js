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

app.use(express.static(staticFiles))

// Handle client connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    // If a user connects, they are assigned their private room (ID)
    socket.join(socket.id)

    // Private message listener
    socket.on('private message', (to, msg) => {
        const messageData = {
            from: socket.id,
            to: to,
            text: msg,
        }

        // Deliver a message to a specified recipient
        io.to(to).emit('private message', messageData)
    })

    // When a user is disconnected
    socket.on('disconnect', () => {
        console.log(`User disconected ${socket.id}`)
    })
})

// Start the server
server.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})