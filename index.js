const port = 4001;
const { v4: uuid } = require("uuid");
const { Server } = require("socket.io");
const io = new Server(port, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const messages = [];

io.on("connection", (socket) => {
	socket.emit("connection");
	console.log(`User with ID: ${socket.id} has connected`);
	socket.on("disconnect", () => {
		console.log(`User with ID: ${socket.id} has disconnected`);
	});

	socket.on("choose_username", (data) => {
		socket.username = data;
	});

	// create//join room
	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data} `);
		socket.emit("befintligamedelanden", messages);
	});

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});

	// single client
	socket.emit("user", socket.id);

	// To all clients
	socket.on("messages", (message) => {
		// console.log(message);
		const newMessage = {
			message,
			user: { id: socket.id, username: socket.username },
			id: uuid(),
		};
		io.emit("messages", newMessage);
		messages.push(newMessage);
	});
});
