module.exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", function (socket) {
    console.log("conection recieved");
    // If chat is sent by a client

    socket.on("message", (message) => {
      console.log("Socket", message);
      socket.broadcast.emit("broadcast_message", message);
    });
  });
};
