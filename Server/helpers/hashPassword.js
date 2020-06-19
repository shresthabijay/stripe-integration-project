const sha256 = require("js-sha256");

module.exports = (password) => {
  let hashedPassword = sha256(process.env.PASSWORDSALT + password);
  return hashedPassword;
};
