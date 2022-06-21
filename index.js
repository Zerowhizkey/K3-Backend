// const express = require("express");
// const app = express();
const port = 4001;
const { Server } = require("socket.io");
const io = new Server(port, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

// app.use(express.json());

// app.get("/", (req, res) => {
// 	res.send("<h1> Hello World! </h1>");
// });

io.on("connection", (socket) => {
	socket.emit("connection");
	console.log(`Socket with ID: ${socket.id} has connected`);
	socket.on("disconnect", () => {
		console.log(`Socket with ID: ${socket.id} has disconnected`);
	});

	// single client
	socket.emit("user", socket.id);

	// To all clients
	socket.on("messages", ({ message, user }) => {
		// console.log(message);
		io.emit("messages", { message, user });
	});
});
