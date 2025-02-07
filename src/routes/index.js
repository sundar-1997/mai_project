//Notes !---> Place routes like /help before generic routes like /:id 
// in your route file. This way, Express will correctly match the /help
//  route before attempting to match /:id.

var express = require("express");
var app = express();

var userRouter = require("./userRoute");

//User Routes
app.use("/user", userRouter);

module.exports = app;
