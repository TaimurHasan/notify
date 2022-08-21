const messages = [];

function getMessages() {
    return messages;
};

function addMessage(message) {

    messages.push(message);
    console.log(messages)
};

module.exports = {
    getMessages,
    addMessage
}