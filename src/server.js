//Notes !---> Place routes like /help before generic routes like /:id 
// in your route file. This way, Express will correctly match the /help
//  route before attempting to match /:id.

//Libs
var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");
require("dotenv").config();
var cors = require("cors");
var apiRouter = require("../src/routes/index.js");
const apiResponse = require("../src/helpers/apiResponse");

//Socket Libc
const http = require("http");
const socketIo = require("socket.io");

//Bcrypt
const bcrypt = require("bcrypt");

//Database connection
const connectToDatabase = require("./config/mongoDbConfig");

// Libs
const fs = require("fs");
const moment = require("moment");

//initial settings

connectToDatabase();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public',cors(),express.static(path.join(__dirname, 'public')));

// Define allowed origins
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Check if the origin is in the allowed list or if there's no origin (for same-origin requests like in Postman)
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If cookies or authorization headers are needed
}));

// Import socket routes

// Socket connection

const server = http.createServer(app);

const socketRoutes = require("../src/routes/socketRoutes.js");
const io = socketIo(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
  },
  allowEIO3: true, // Ensure compatibility with older clients
  transports: ["polling", "websocket"], // Allow both polling and WebSocket
});

socketRoutes(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Mai chat ");
});

const YOUR_DOMAIN = "http://localhost:5500";

app.use("/api/", apiRouter);

// Serve static files from the 'uploads' directory
const uploadsDirectory = path.join(__dirname, "..", "uploads");
app.use("/uploads", cors(), express.static(uploadsDirectory));

// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

server.listen(process.env.DEV_ENV_PORT, (req, res) => {
  console.log("Server Started At " + process.env.DEV_ENV_PORT);
});
