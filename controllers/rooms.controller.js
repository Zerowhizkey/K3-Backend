const roomsModel = require("../models/rooms.model");

async function createRoom(name) {
	if (!name) {
		return console.log("You need a room name!");
	}
	try {
		const result = await roomsModel.createRoom(name);

		return result;
	} catch (error) {
		return console.log("The room already exists");
	}
}

async function getRoom(id) {
	const result = await roomsModel.getRoom(id);
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

async function deleteRoom(name) {
	const result = await roomsModel.deleteRoom(name);
	console.log(result, "haha");
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
