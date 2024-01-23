const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoutes");
const { appointmentRoute } = require("./routes/appointmentRoute");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/user", userRoute);
app.use("/appointments", appointmentRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Runing on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
