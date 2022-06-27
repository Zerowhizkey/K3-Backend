const db = require("../config/db");

function createRoom(id, name) {
	const sql = "INSERT INTO rooms (id, name) VALUES (?, ?)";
	return new Promise((resolve, reject) => {
		db.run(sql, [id, name], function (error, room) {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(room);
		});
	});
}

function getRoom(id) {
	const sql = "SELECT * FROM rooms WHERE id = ?";
	return new Promise((resolve, reject) => {
		db.get(sql, id, (error, room) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(room);
		});
	});
}

function deleteRoom(id) {
	const sql = "DELETE FROM rooms WHERE id = ?";
	return new Promise((resolve, reject) => {
		db.run(sql, id, (error) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(id);
		});
	});
}

module.exports = {
	createRoom,
	getRoom,
	deleteRoom,
};
