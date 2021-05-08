
// Importing Libraries
const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
const http = require('http').createServer(app);
// Socket
const io = require('socket.io')(http);
// Mongoose
const mongoose = require('mongoose');
// const uri = process.env.MONGO_URI;
const uri = process.env.MONGO_URI;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Initializing arrays for socket data
const classes = [];
let onlineUsers = [];

// Socket.IO server events
// Logging data to console for getting real time info
io.on('connection', socket => {

    // Add user to the onlineUsers array
    socket.on("user online", (username) => {
      onlineUsers.push({username, socketId: socket.id});
      console.table(onlineUsers);
    });

    // Handling disconnect event
    socket.on('disconnect', () => {

      // Remove user from onlineUsers array
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
      console.log("onlineUsers");
      console.table(onlineUsers);
    });
});


// Routes
const authRouter = require('./routes/auth.js');
const classRouter = require('./routes/class.js');
app.use('/api/auth', authRouter);
app.use('/api/class', classRouter);

// Client routes
app.use(express.static(path.join("dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join("dist", "index.html"), {root: path.join(__dirname, "..", "..")});
});


// MongoDB and server setup
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
  console.log("MongoDB database connection established successfully!");
  http.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
}).catch(err => console.log(err));


const connection = mongoose.connection;
connection.on('error', err => {
  console.log(err)
});
