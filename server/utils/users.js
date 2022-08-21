const users = [];

function addUser(id, username, room) {
    // create a new user and return
    const user = { id, username, room};
    users.push(user);

    return user;
};

function addMessage(message) {

    messages.push(message);
    console.log(messages)
};

module.exports = {
    getMessages,
    addMessage
}