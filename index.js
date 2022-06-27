const port = 4001;
const { v4: uuid } = require("uuid");
const { Server } = require("socket.io");
const io = new Server(port, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const db = require("./config/db");
const { createUser, getUser } = require("./controllers/users.controller");
const {
	createRoom,
	getRoom,
	deleteRoom,
} = require("./controllers/rooms.controller");

const messages = [];

io.on("connection", (socket) => {
	socket.emit("connection");
	// console.log(`User with ID: ${socket.id} has connected`);
	socket.on("disconnect", () => {
		// console.log(`User with ID: ${socket.id} has disconnected`);
	});

	socket.on("choose_username", (name) => {
		const newUser = createUser(socket.id, name);
	});

	// create//join room
	socket.on("join_room", async (name) => {
		// const newUser = createUser(socket.id, name);
		const user = await getUser(socket.id);
		const newRoom = await createRoom(socket.id, name);
		const room = await getRoom(socket.id);
		socket.join(newRoom);
		console.log(`User with ID: ${user.id} joined room: ${room.name} `);
		socket.emit("befintligamedelanden", messages);
	});

	socket.on("existingRoom", async (name) => {
		const room = await getRoom(socket.id, name);
	});

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});

	// single client
	socket.on("user", () => {
		const user = getUser(socket.id);
		socket.emit(user.name);
	});

	// To all clients
	socket.on("messages", async (message) => {
		// console.log(message);
		const user = await getUser(socket.id);
		const newMessage = {
			message,
			user,
			id: uuid(),
		};
		io.emit("messages", newMessage);
		messages.push(newMessage);
	});
});
