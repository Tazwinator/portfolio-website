const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({extended: true}));

// ----------------------- Routes ------------------------------- //

app.get("/", (req, res) => {
  res.render("pages/home")
});

app.get("/auth", (req, res) => {
  res.render("pages/auth")
})


app.listen(3000, () => {
  console.log("Listening on port 3000")
});