const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:21017/patientscheduler");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req,res) => {
    app.render("index");
});

app.listen(3000, () => {
    console.log("Server running on: http://localhost:3000");
})