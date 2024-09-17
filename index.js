const express = require("express");
const app = express();
let mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");
const AppointmentService = require("./services/AppointmentService");

app.set("view engine", "ejs"); // change view engine to ejs
mongoose.connect("mongodb://localhost:27017/patients"); // Create mongoDB connection

app.use(express.static("public")); // use static files on folder public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  let status = await appointmentService.Create(
    req.body.name,
    req.body.email,
    req.body.description,
    req.body.ssn,
    req.body.date,
    req.body.time
  );

  if(status){
    res.redirect("/")
  }else{
    res.status(400).send("<h1>Error Occured!</h1>");
  }
});

app.get("/getappointments", async (req,res) => {
    let appointments = await AppointmentService.GetAll(false);

    res.status(200).json(appointments);
})

app.get("/appointment/:id", async (req,res) => {
    let appointment = await AppointmentService.GetById(req.params.id);
    res.render('event',{appo: appointment});
});

app.post("/finish", async (req,res) => {
    let id = req.body.id;
    let result = await AppointmentService.Finish(id);
    res.redirect('/');
})

app.get('/list', async (req,res) => {

    let appos = await AppointmentService.GetAll(true);
    res.render("list", {appos});
})

app.get("/searchresult", async (req,res) => {
    let appos = await AppointmentService.Search(req.query.search);
    if(appos.length == 0){
        res.redirect("/list");
    }else{
        res.render("list",{appos});
    }
})

app.listen(3000, () => {
  console.log("Server running on: http://localhost:3000");
});
