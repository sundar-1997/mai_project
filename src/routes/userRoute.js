var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();

// non generic routes 

// user register
router.post("/register", userController.register);
// user login
router.post("/login", userController.login);
// user logout 
router.post("/logout/:id", userController.logout);


module.exports = router;
