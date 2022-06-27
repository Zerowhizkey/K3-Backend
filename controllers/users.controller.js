const usersModel = require("../models/users.model");

async function createUser(req, res) {
	if (!res) {
		return console.log("You need a username");
	}
	try {
		const result = await usersModel.createUser(req, res);
		// console.log(result, "Create user result");
		return result;
	} catch (error) {
		return console.log("User could not be created");
	}
}

async function getUser(req, res) {
	const result = await usersModel.getUser(req);
	if (!result) {
		return console.log("No such user");
	}
	return result;
}

module.exports = {
	createUser,
	getUser,
};
