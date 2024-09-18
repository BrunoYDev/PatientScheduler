const appointment = require('../models/Appointment');
let mongoose = require('mongoose');
let AppointmentFactory = require("../factories/AppointmentFactory");
let mailer = require("nodemailer");

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
            finished: false,
            notified: false
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

    async GetById(id){
        try {
            let event = await Appo.findOne({'_id': id});
            return event;
        } catch (error) {
            console.log(error)
        }
    }

    async Finish(id){
        try {
            await Appo.findByIdAndUpdate(id,{finished: true});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async Search(query){
        try {
            let appos = await Appo.find().or([{email: query},{ssn: query}]);
            return appos;
        } catch (error) {
            console.log(error);
            return [];
        }
        
    }

    async SendNotification(){
        let appos = await this.GetAll(false);

        let transporter = mailer.createTransport(({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "7f565fc9f5c84b",
                pass: "024c5841db7e9e"
            }
        }));

        appos.forEach( async app => {

            let date = app.start.getTime();
            let hour = 1000 * 60 * 60;
            let gap = date-Date.now();

            if(gap <= hour){
                
                if(!app.notified){

                    await Appo.findByIdAndUpdate(app.id,{notified: true});

                    transporter.sendMail({
                        from: "Bruno Garcia Dev <bruno@mail.com.br>",
                        to: app.email,
                        subject: "Your appointment will happen in One Hour",
                        text: "Please pay attention on the clock, your appointment is less than one hour."
                    }).then( () => {

                    }).catch(err => {
                        console.log(err);
                    })
                }

            };

        });
    }
};

module.exports = new AppointmentService();