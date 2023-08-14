// Express
const express = require("express");
const port = 8000;
const app = express();
const cors = require("cors");

// Database Connection
const db_connection = require("./config/mongoose");

// Socket connection Configuration
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chatSockets.js").chatSocket(chatServer);
const socketPort = 5050;

// Allowing CORS requests//Remember to change the allowed orgin
app.use(cors());

// Parsers
app.use(express.urlencoded());
app.use(express.json({ extended: true }));

// Passport
const passport = require("passport");
const jwt = require("./config/passport-jwt-strategy");

db_connection().then(() => {
  // Routes
  app.use("/", require("./routes"));

  // Initialise Passport
  app.use(passport.initialize());

  // Server
  app.listen(port, function (err) {
    if (err) {
      console.log(`Server Failed to start . Error Encountered : ${err} `);
      return;
    }
    // Starting the socket server
    chatServer.listen(socketPort, (err) => {
      if (err) {
        console.log("Error in starting server");
        return;
      }
      console.log(`Socket successfully listen on port ${socketPort}`);
    });
    console.log(`Server started succesfully`);
  });
});
