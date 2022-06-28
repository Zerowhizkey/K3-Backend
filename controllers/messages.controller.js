const messageModel = require("../models/messages.model");

async function addMessage(req, res) {
	const result = await messageModel.addMessage(req);
	if (!result) {
		return console.log("No messagess");
	}
	return result;
}

async function getMessages(req, res) {
	const result = await messageModel.getMessages(req);
	if (!result) {
		return console.log("No messages here yet");
	}
	return result;
}

async function deleteMessages(req, res) {
	const result = await messageModel.deleteMessages(req);
	if (!result) {
		return console.log("no messages");
	}
}

module.exports = {
	addMessage,
	getMessages,
	deleteMessages,
};
