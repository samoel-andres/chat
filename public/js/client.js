import { appendMessage } from "./append-elements.js"

const socket = io()

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-message')
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage)
    }

    socket.on('connect', () => {
        document.getElementById('title-chat').dataset.id = socket.id
    })

    // Message listener
    socket.on('private message', (msg) => {
        appendMessage('receiver', msg.text)
    })

    // Send a message
    function sendMessage() {
        const to = document.getElementById('title-chat').dataset.id
        const input = document.getElementById('message-input')

        if (input && to) {
            socket.emit('private message', to, input.value)
            appendMessage('sender', input.value)
            input.value = ''
        }
    }
})