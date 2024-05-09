const jwt = require("jsonwebtoken");

module.exports = signToken = (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY);
};
