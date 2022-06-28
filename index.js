const port = 4001;
const { Server } = require("socket.io");
const io = new Server(port, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const fs = require("fs");

const db = require("./config/db");
const {
	createUser,
	getUser,
	getAllUser,
} = require("./controllers/users.controller");
const {
	createRoom,
	getRoom,
	deleteRoom,
	getAllRooms,
} = require("./controllers/rooms.controller");

const {
	addMessage,
	getMessages,
	deleteMessages,
} = require("./controllers/messages.controller");

function messageLog(data) {
	const fsData = JSON.stringify(data);
	if (data.msg) {
		fs.appendFile("message_log.txt", fsData + "\n", (error) => {
			if (error) {
				return console.log("Error writing to message_log.txt");
			}
			//else {
			// 	return console.log(
			// 		"Attemp to store data in message_log.txt was successful"
			// 	);
			// }
		});
	}
}
io.use((socket, next) => {
	socket.on("message", (data) => {
		const newMessage = {
			user_id: socket.id,
			msg: data.msg,
			room_id: data.roomName,
			user_name: data.username,
			date: Date.now(),
		};
		messageLog(newMessage);
	});
	next();
});

// const messages = [];

io.on("connection", async (socket) => {
	console.log(`User with ID: ${socket.id} has connected`);
	const rooms = await getAllRooms();
	const users = await getAllUser();
	socket.emit("connection", { rooms, users });
	// console.log(rooms);
	socket.on("disconnect", () => {
		console.log(`User with ID: ${socket.id} has disconnected`);
	});

	socket.on("choose_username", (name) => {
		const newUser = createUser(socket.id, name);
	});

	socket.on("join_room", async (name) => {
		const user = await getUser(socket.id);

		const rooms = await getAllRooms();

		const checkRoom = rooms.filter((room) => {
			return room.name === name;
		});
		if (checkRoom.length === 0) {
			await createRoom(name);
			const updateRoom = await getAllRooms();
			io.emit("update_room", updateRoom);
		}
		socket.join(name);
		const room = Array.from(socket.rooms);
		if (room.length === 3) {
			const leaveRoom = room[1];
			socket.leave(leaveRoom);
		}
		const roomMessages = await getMessages(name);
		io.to(name).emit("sent_message", roomMessages);
		// console.log(newRoom);
		// console.log(`User with ID: ${user?.id} joined room: ${name}`);
		// console.log(socket.rooms);
	});

	socket.on("delete_room", async (roomName) => {
		await deleteRoom(roomName);
		await deleteMessages(roomName);
		const updatedRooms = await getAllRooms();
		io.emit("deleted_room", updatedRooms);
	});

	socket.on("message", async (data) => {
		if (!data.msg.length) {
			return;
		}
		if (!data.roomName.length) {
			return;
		}

		const newMessage = {
			user_id: socket.id,
			msg: data.msg,
			room_id: data.roomName,
			user_name: data.username,
			date: Date.now(),
		};
		addMessage(newMessage);
		const roomMessages = await getMessages(data.roomName);
		io.to(data.roomName).emit("sent_message", roomMessages);
	});

	socket.on("user", () => {
		const user = getUser(socket.id);
		socket.emit(user.name);
	});
});
