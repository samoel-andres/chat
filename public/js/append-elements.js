let isAppending = false

/**
 * Creates and appends a message to the chat.
 * 
 * @function appendMessage
 * @param {HTMLElement} button - The HTML element that triggers the event.
 * @param {string} from - Specifies whether the message is from other user 'receiver' or the sender.
 * @param {string} content - The text content of the message.
 * @returns {void}
 */
export function appendMessage(from, content) {
    if (!content || isAppending) return
    isAppending = true

    const alignTo = from === 'receiver' ? 'h-start' : 'h-end'
    const mFrom = from === 'receiver' ? 'ms' : 'me'
    const style = from === 'receiver' ? 'received-style' : 'emitted-style'

    const objectConfig = createMessageObject(content, alignTo, mFrom, style)
    appendElement(objectConfig, 'messages-content', 'sender')

    setTimeout(() => {
        isAppending = false
    }, 100)
}

/**
 * Creates an HTML element based on the provided configuration.
 * 
 * @function createElement
 * @param {ElementConfig} config - The configuration object defining the element's properties.
 * @param {string} from - Specifies whether the messages is from other user 'receiver' or the 'sender'.
 * @returns {HTMLElement} The created HTML element.
 */
function createElement(config, from) {
    const element = document.createElement(config.element)

    if (config.class) element.className = config.class
    if (config.text) element.innerText = config.text

    if (config.children && Array.isArray(config.children)) {
        config.children.forEach((childConfig) => {
            const childElement = createElement(childConfig, from)
            element.appendChild(childElement)
        })
    }

    return element
}

/**
 * Appends a new message element to the specified parent container.
 * 
 * @function appendElement
 * @param {ElementConfig} objectConfig - Configuration object to create the HTML message element.
 * @param {string} parentId - Identifier of the parent container.
 * @param {string} from - Specifies the source of the message: 'sender' for outgoing messages, or 'receiver' for incoming messages.
 * @returns {void}
 */
function appendElement(objectConfig, parentId, from) {
    const parentContainer = document.getElementById(parentId)
    const elementCreated = createElement(objectConfig, from)

    if (parentContainer && elementCreated) {
        parentContainer.appendChild(elementCreated)
    }
}

/**
 * Defines the required HTML structure for the message element.
 * 
 * @function createMessageObject
 * @param {string} content - The text content of the message.
 * @param {string} alignTo - Alignmet for the message: 'h-start' for incoming messages, or 'h-end' for outgoing messages.
 * @param {string} mFrom - Normalized margin: 'ms' for incoming messages, or 'me' for outgoing messages.
 * @param {string} style - Applied style for the element: 'received-style' for incoming messages, or 'emitted-style' for outgoing messages.
 * @returns {ElementConfig} - The configuration object to create the message element.
 */
function createMessageObject(content, alignTo, mFrom, style) {
    const objectConfig = {
        element: {
            element: 'div',
            class: `col-12 v-center ${alignTo}`,
            children: [
                {
                    element: 'div',
                    class: `col-5 ${style} pt pb ${mFrom}`,
                    children: [
                        {
                            element: 'span',
                            class: 'p-1',
                            text: content
                        }
                    ]
                }
            ]
        }
    }

    return objectConfig.element
}