const env = require("dotenv");
env.config();
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.json({ message: "User is not Authorized" });
    } else {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          res.json({ message: "error config" });
        }
        const userID = decoded.userID;
        req.userID = userID;
        next();
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authentication };
