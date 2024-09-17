const appointment = require('../models/Appointment');
let mongoose = require('mongoose');

let Appo = mongoose.model("Appointment", appointment);

class AppointmentService {

    async Create(name,email,description,ssn,date,time){
        let newAppo = new Appo({
            name,
            email,
            description,
            ssn,
            date,
            time,
            finished: false
        });

        try {
            await newAppo.save();
            return true;
        } catch (err) {
            console.log(err);
            return false
        }
    }

};

module.exports = new AppointmentService();