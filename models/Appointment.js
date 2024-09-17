const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    ssn: String,
    date: Date,
    time: String,
    finished: Boolean
});

module.exports = appointment;