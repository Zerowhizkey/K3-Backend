const usersModel = require("../models/users.model");

async function createUser(id, name) {
	if (!name) {
		return console.log("You need a username");
	}
	try {
		const result = await usersModel.createUser(id, name);
		return result;
	} catch (error) {
		return console.log("User could not be created");
	}
}

async function getUser(id) {
	const result = await usersModel.getUser(id);
	if (!result) {
		return console.log("No such user");
	}
	return result;
}

async function getAllUser() {
	const result = await usersModel.getAllUser();
	if (!result) {
		return console.log("No users");
	}
	return result;
}

module.exports = {
	createUser,
	getUser,
	getAllUser,
};
