const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  specialization: {
    type: String,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  slots: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };
