const messageModel = require("../models/messages.model");

async function addMessage(message) {
	const result = await messageModel.addMessage(message);
	if (!message) {
		return console.log("No messagess");
	}
	return result;
}

async function getMessages(roomId) {
	const result = await messageModel.getMessages(roomId);
	if (!result) {
		return console.log("No messages here yet");
	}
	return result;
}

async function deleteMessages(roomId) {
	const result = await messageModel.deleteMessages(roomId);
	if (!roomId) {
		return console.log("No Id");
	}
}

module.exports = {
	addMessage,
	getMessages,
	deleteMessages,
};
