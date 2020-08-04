const config = require("./config/config")
module.exports = (plop) => {
  plop.setGenerator("component", config);
};
