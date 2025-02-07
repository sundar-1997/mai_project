const mongoose = require("mongoose");
const { body, check, validationResult } = require("express-validator");

// Helpers
const apiResponse = require("../helpers/apiResponse.js");
const auth = require("../middlewares/auth.js");

//Model Imports
const userModel = require("../models/userModel.js");

//Services
const userApiSanitizser = require("../services/apiSantizers/customerControllerSantiszer.js");

//Libs/Package
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");


exports.register = [
    body("username")
    .isLength({ min: 1 })
    .trim()
    .withMessage("field username is required"),
    body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("field password is required"),
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .custom((value, { req }) => {
      return userModel.findOne({ email: value })
        .then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use for this user");
          }
        });
    }),
    async (req, res) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('errors--->',errors);
      return apiResponse.validationErrorWithData(
        res,
        "Validation Error.",
        errors.array()
      );
    }
    try { 
      var hashedPassword ="";
      hashedPassword = await bcrypt.hash(req.body.password, 10);
      // user data
      const userModelData = await userModel.create({
        username : req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
      const sanitizedUserDetails = userApiSanitizser.removeNullValues(
        userModelData.toObject()
      );
        return apiResponse.successResponseWithData(
          res,
          "User Registration Success.",
          sanitizedUserDetails
        );

    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(
        res,
        "An error occurred while processing user registration.",
        err
      );
    }
  },
];

exports.login = [
body("email")
  .isLength({ min: 1 })
  .trim()
  .withMessage("Email must be specified.")
  .isEmail()
  .withMessage("Email must be a valid email address."),
body("password")
  .isLength({ min: 1 })
  .trim()
  .withMessage("Password must be specified."),
body("email").escape(),
body("password").escape(),
async (req, res) => {
  try {
    const errors = validationResult(req);
if (!errors.isEmpty()) {
return apiResponse.validationErrorWithData(
res,
"Validation Error.",
errors.array()
);

} else {

await userModel.findOneAndUpdate(
    { email: req.body.email }, 
    { $set: { isActive: true } }, 
    { new: true }).then((data) => {
   if (data) {
//Compare given password with db's hash.
   bcrypt.compare(req.body.password, data.password,
  function (err, same) {
    if (same) {
      //Check account confirmation.
      // Check User's account active or not.
        let userData = {
          _id: data._id,
          username: data.username,
          email: data.email,
        };
        //Prepare JWT token for authentication
        const jwtPayload = userData;
        const jwtData = {
          expiresIn: process.env.JWT_TIMEOUT_DURATION,
        };
        const secret = process.env.JWT_SECRET;
        //Generated JWT token with Payload and secret.
        userData.token = jwt.sign(jwtPayload, secret, jwtData);
     //   console.log("userloggedin-->",userData._id);
        return apiResponse.successResponseWithData(
          res,
          "Login Success.",
          userData
        );

    } else {
      return apiResponse.unauthorizedResponse(
        res,
        "Email or Password wrong."
      );
    }
  }
);
} else {
return apiResponse.unauthorizedResponse(
  res,
  "User not exists."
);
}
});
}
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err);
  }
},
];

exports.logout = [
 async (req, res) => {
  try {
  await userModel.findOneAndUpdate(
      { _id: req.params.id }, 
      { $set: { isActive: false } }, 
      { new: true } // Ensures you get the updated document
    ).then((data) => {
     if (data) {
        //Check account confirmation.
        // Check User's account active or not.
          let userData = {
            _id: data._id,
            username: data.username,
            email: data.email,
            isActive: data.isActive,
          };
        
          return apiResponse.successResponseWithData(
            res,
            "Logout Success.",
            userData
          );
  } else {
  return apiResponse.unauthorizedResponse(
    res,
    "User not exists."
  );
  }
  });
  }catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
