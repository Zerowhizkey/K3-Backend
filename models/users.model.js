const db = require("../config/db");

function createUser(id, name) {
	const sql = "INSERT INTO users (id, name) VALUES (?, ?)";
	return new Promise((resolve, reject) => {
		db.run(sql, [id, name], function (error, user) {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(user);
		});
	});
}

function getUser(id) {
	const sql = "SELECT * FROM users WHERE id = ?";
	return new Promise((resolve, reject) => {
		db.get(sql, id, (error, user) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(user);
		});
	});
}

module.exports = {
	createUser,
	getUser,
};
