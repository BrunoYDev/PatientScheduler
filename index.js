const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req,res) => {
    app.render("index");
});

app.listen(3000, () => {
    console.log("Server running on: http://localhost:3000")
})