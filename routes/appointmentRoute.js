const express = require("express");
const {
  addAppointment,
  getAppointment,
} = require("../controller/appointmentController");
const { authentication } = require("../middleware/auth");

const appointmentRoute = express.Router();

appointmentRoute.post("/add", authentication, addAppointment);
appointmentRoute.get("/get", authentication, getAppointment);

module.exports = { appointmentRoute };
