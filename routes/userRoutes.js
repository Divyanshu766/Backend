const express = require("express");
const { userSignup, userLogin } = require("../controller/userController");
const { authentication } = require("../middleware/auth");

const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.post("/login", userLogin);

module.exports = { userRoute };
