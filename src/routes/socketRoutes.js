// Libs
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

// Models
const messageModel = require("../models/messageModel.js");
// services
const apiResponse = require("../helpers/apiResponse.js");
const auth = require("../middlewares/auth.js");
const userServices = require("../services/apiServices/userServices.js");

module.exports = (io) => {

  // io authentication
  io.use(async (socket, next) => {
      try {
          const token = socket.handshake.query.authtoken;
          const isValidToken = await userServices.validateAuthToken(token);
          if (isValidToken.success) {
              socket.userDetails = isValidToken.data.userDetails;
              return next();
          } else {
              console.log("Authentication error");
              next(new Error("Authentication error"));
          }
      } catch (error) {
          console.error("Authentication error:", error);
          next(new Error("Authentication error"));
      }
  });

  // io connection
  io.on("connection", async (socket) => {

      console.log("A user is connected");
 
      socket.on("joinRoom", async (userId) => {
        socket.join(userId);
        const allmessages = await messageModel.find();
    
        // Emit messages only to the sender’s room
        io.emit("receiveMessage", allmessages); 
      });
  
      // Handle message event
      socket.on("sendMessage", async (data) => {
        let messages = JSON.stringify(data);
        console.log('messages-->',JSON.parse(messages));
        let parsedobject = JSON.parse(messages);
        const message = await messageModel.create({
          text: parsedobject.text,
          sender: parsedobject.sender,
          timestamp: parsedobject.timestamp,
          senderid: parsedobject.senderid
      });
        
      const allmessages = await messageModel.find();
    
      // Emit messages only to the sender’s room
      io.emit("receiveMessage", allmessages); 

      });
      
      socket.on("disconnect", () => {
          console.log("User disconnected");
      });
  });
};

