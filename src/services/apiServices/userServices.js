const { body, validationResult } = require("express-validator");
const apiResponse = require("../../helpers/apiResponse");

//
const userModel = require("../../models/userModel.js");

exports.checkIsValidUser = async (userId) => {
  try {
    const userModelInfo = await userModel.findOne({
      _id: userId,
    });

    if (!userModelInfo) {
      return {
        success: false,
        message: userModelInfo,
        error: "Error fetching user info",
      };
    }

    if (userModelInfo.isActive === 1) {
      return {
        success: true,
        message: "Active user",
        data: {
          isActive: 1,
        },
      };
    } else {
      return {
        success: false,
        message: "Not a Active user",
        data: {
          isActive: 0,
        },
      };
    }
  } catch (error) {
      console.log(error);
    return {
      success: false,
      message: "An error occurred while fetching user info.",
      error: error,
    };
  }
};

const jwt = require("jsonwebtoken");
let JWT_SEC_KEY = process.env.JWT_SECRET;

exports.validateAuthToken = async (authtoken) => {
  try {
    const token = authtoken;
    console.log('token--->',token);
    const splitToken = token.split(" ");

    if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
      // Invalid token format
      return {
        success: false,
        message: "Invalid token format",
      };
    }

    const bearerToken = splitToken[1];
    const decodedUserDetails = jwt.verify(bearerToken, JWT_SEC_KEY);

    // Token is valid
    return {
      success: true,
      message: "Token is valid",
      data: {
        userDetails: decodedUserDetails,
      }, // Assuming _id is the user ID in the JWT payload
    };
  } catch (e) {
    // Token verification failed
    return {
      success: false,
      message: "Failed to authenticate token",
      error: e.message, // Include the error message for debugging
    };
  }
};
