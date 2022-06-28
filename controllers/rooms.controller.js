const roomsModel = require("../models/rooms.model");

async function createRoom(req, res) {
	if (!res) {
		return console.log("Le room need Le name");
	}
	try {
		const result = await roomsModel.createRoom(req, res);
		// console.log(result, "Create room result");
		return result;
	} catch (error) {
		return console.log("room could not be created");
	}
}

async function getRoom(req, res) {
	const result = await roomsModel.getRoom(req);
	if (!result) {
		return console.log("No such room");
	}
	return result;
}

async function getAllRooms(req, res) {
	const result = await roomsModel.getAllRooms(req);
	if (!result) {
		return console.log("No rooms");
	}
	return result;
}

async function deleteRoom(req, res) {
	const result = await roomsModel.deleteRoom(req);
	if (!result) {
		return console.log("room does not exist");
	}
	return result;
}

module.exports = {
	createRoom,
	getRoom,
	deleteRoom,
	getAllRooms,
};
