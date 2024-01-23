const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const userSignup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({ message: "User is already present !!!" });
    } else {
      if (confirmPassword != password) {
        return res.json({ message: "Conform password not match" });
      }

      bcrypt.hash(password, 8, async function (err, hash) {
        await UserModel.create({
          email,
          password: hash,
        });
      });

      return res.send({ message: "User is successfully Registered" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.json({ message: "User is not registered !!!" });
    } else {
      const pass = bcrypt.compare(
        password,
        user.password,
        function (err, result) {
          if (err) {
            return res.json({ message: "Internal Service Error" });
          }

          if (result) {
            const token = jwt.sign({ userID: user._id }, process.env.SECRET);
            return res.json({
              message: "User SuccessFully LoggedIn",
              token: token,
            });
          } else {
            return res.json({ message: "Wrong credentials" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignup, userLogin };
