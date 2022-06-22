const port = 4001;
const { Server } = require("socket.io");
const io = new Server(port, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.emit("connection");
	console.log(`User with ID: ${socket.id} has connected`);
	socket.on("disconnect", () => {
		console.log(`User with ID: ${socket.id} has disconnected`);
	});

	// create//join room
	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data} `);
	});

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});

	// single client
	socket.emit("user", socket.id);

	// To all clients
	socket.on("messages", ({ message, user }) => {
		// console.log(message);
		io.emit("messages", { message, user });
	});
});
