const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs"); // change view engine to ejs
mongoose.connect("mongodb://localhost:21017/patientscheduler"); // Create mongoDB connection

app.use(express.static("public")); // use static files on folder public
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.get("/", (req,res) => {
//     res.render("index");
// });

app.get("/register", (req,res) => {
    res.render('create');
})

app.listen(3000, () => {
    console.log("Server running on: http://localhost:3000");
})