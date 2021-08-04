const jwt = require("jsonwebtoken");

const checkUser = (token) => {
  // let user;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        return (user = null);
      } else {
        return (user = decodedToken);
      }
    });
  }
  return user;
};

module.exports = checkUser;
