class AppointmentFactory{

    Build(SimpleAppointment){

        let day = SimpleAppointment.date.getDate()+1;
        let month = SimpleAppointment.date.getMonth();
        let year = SimpleAppointment.date.getFullYear();

        let hour = Number.parseInt(SimpleAppointment.time.split(":")[0]);
        let minutes = Number.parseInt(SimpleAppointment.time.split(":")[1]);

        let startDate = new Date(year,month,day,hour,minutes,0,0);
        startDate.setHours( startDate.getHours() - 4 );

        let appo = {
            id: SimpleAppointment._id,
            title: `${SimpleAppointment.name} - ${SimpleAppointment.description}`,
            start: startDate,
            end: startDate
        }

        return appo;
    }

}

module.exports = new AppointmentFactory();