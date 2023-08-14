module.exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "https://lets-connect-india.netlify.app",
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
