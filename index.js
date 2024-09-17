const express = require("express");
const app = express();
let mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");

app.set("view engine", "ejs"); // change view engine to ejs
mongoose.connect("mongodb://localhost:27017/patients"); // Create mongoDB connection

app.use(express.static("public")); // use static files on folder public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req,res) => {
    res.send("index");
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

app.listen(3000, () => {
  console.log("Server running on: http://localhost:3000");
});
