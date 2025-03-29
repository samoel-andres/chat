import { appendMessage } from "./append-elements.js"

const socket = io()

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-message')
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage)
    }

    // Message listener
    socket.on('chat message', (msg) => {
        const { userId, text } = msg

        if (!userId || !text) return

        if (userId === socket.id) {
            appendMessage('sender', text)
        } else {
            appendMessage('receiver', text)
        }
    })

    // Send a message
    function sendMessage() {
        const input = document.getElementById('message-input')
        if (input) {
            socket.emit('chat message', input.value)
            input.value = ''
        }
    }
})