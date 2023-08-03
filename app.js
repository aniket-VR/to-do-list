const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodys = require("body-parser");
const app = express();

app.use(cors());
app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://admin-aniket:aniket2002@cluster0.p8qbwha.mongodb.net/todolist"
  )
  .catch(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to Server");
    }
  });

const recordToDoList = new mongoose.Schema({
  info: String,
});

const studyColl = new mongoose.model("studies", recordToDoList);

app.use(bodys.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  studyColl.find().then((items) => {
    res.render("index", { listARR: items });
  });
});

app.post("/", function (req, res) {
  const ip = req.body.inputinfo;
  if (ip != "") {
    const record = new studyColl({
      info: ip,
    });
    record.save().then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});
app.post("/delete", (req, res) => {
  let temp = req.body.checkbox;
  let final = "ObjectId('" + temp + "')";
  console.log(final);
  studyColl
    .findByIdAndRemove(temp)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("server started");
});
