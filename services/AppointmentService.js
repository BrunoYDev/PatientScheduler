const appointment = require('../models/Appointment');
let mongoose = require('mongoose');
let AppointmentFactory = require("../factories/AppointmentFactory");

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

    async GetAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            let appos = await Appo.find({'finished': false});
            let appointments = [];

            appos.forEach(appointment => {

                if(appointment.date != undefined){
                    appointments.push( AppointmentFactory.Build(appointment) );
                }
                
            })

            return appointments;
        }
    }

};

module.exports = new AppointmentService();