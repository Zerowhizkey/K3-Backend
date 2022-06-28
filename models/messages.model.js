const db = require("../config/db");

function addMessage({ msg, room_id, user_id, user_name, date }) {
	const sql =
		"INSERT INTO messages (msg, room_id, user_id, user_name, date) VALUES (?, ?, ?, ?, ?)";
	return new Promise((resolve, reject) => {
		db.run(sql, [msg, room_id, user_id, user_name, date], (error) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve();
		});
	});
}
function getMessages(roomId) {
	const sql = "SELECT * FROM messages WHERE room_id = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [roomId], (error, room) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(room);
		});
	});
}

function deleteMessages(roomId) {
	const sql = "DELETE from messages where room_id = ?";
	return new Promise((resolve, reject) => {
		db.run(sql, [roomId], (error, room) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(room);
		});
	});
}

module.exports = {
	addMessage,
	getMessages,
	deleteMessages,
};
