const { AppointmentModel } = require("../model/appointmentModel");
const { UserModel } = require("../model/userModel");

const addAppointment = async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;

    await AppointmentModel.create({
      name,
      imageUrl,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    res.json({ message: "Appointment Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getAppointment = async (req, res) => {
  try {
    const { filter, sort, name } = req.query;

    const query = {};
    if (filter) {
      query.specialization = filter;
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    let data = await AppointmentModel.find(query);

    if (sort === "asc") {
      data = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addAppointment, getAppointment };
