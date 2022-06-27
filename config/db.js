const sqlite = require("sqlite3").verbose();

const roomStmt = `
CREATE TABLE IF NOT EXISTS rooms
 (
    id TEXT PRIMARY KEY,
     name TEXT UNIQUE
     )`;

const userStmt = `
CREATE TABLE IF NOT EXISTS users 
(
    id TEXT PRIMARY KEY,
     name TEXT
     )`;

const messagestmt = `
CREATE TABLE IF NOT EXISTS messages 
(
    id TEXT PRIMARY KEY,
     msg TEXT NOT NULL,
      room_id TEXT,
        user_id TEXT,
         CONSTRAINT fk_room_id FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE,
          CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
          )`;

const db = new sqlite.Database("./db.sqlite", (error) => {
	if (error) {
		console.error(error.message);
		throw error;
	}
	db.run(roomStmt, (error) => {
		if (error) {
			console.error(error.message);
			throw error;
		}
	});
	db.run(userStmt, (error) => {
		if (error) {
			console.error(error.message);
			throw error;
		}
	});
	db.run(messagestmt, (error) => {
		if (error) {
			console.error(error.message);
			throw error;
		}
	});
});

module.exports = db;
