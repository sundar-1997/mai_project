const { body } = require("express-validator");

exports.sanitizeUser = [
  //validatation and santitization rules
];

exports.removeNullValues = (userData) => {
  const keysToInclude = [
    "username",
    "email",
    "password",
  ];
  const sanitizedData = {};
  keysToInclude.forEach((key) => {
    sanitizedData[key] = userData[key] === null ? "" : userData[key];
  });

  return sanitizedData;
};

exports.removeNullValues = (userData) => {
  Object.keys(userData).forEach((key) => {
    if (userData[key] === null) {
      userData[key] = "";
    }
  });
  return userData;
};
