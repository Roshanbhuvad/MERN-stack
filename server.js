var express = require("express");
var path = require("path");
var mongo = require("mongoose");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var db = require("./config.js");

var app = express();
var port = process.env.port || 3000;
var srcpath = path.join(__dirname, "/public");
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var customerSchema = new Schema(
  {
    customerid: { type: Number },
    name: { type: String },
    age: { type: Number },
    sex: { type: String },
    address: { type: String },
  },
  { versionKey: false }
);

var model = mongoose.model("customer", customerSchema, "customer");

//API for GET data from database

app.get("/api/getdata", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//API for Delete data from database

app.post("/api/Removedata", function (req, res) {
  model.remove({ _id: req.body.customerid }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Deleted..!!" });
    }
  });
});

//API for Update data from database
app.post("/api/Updatedata", function (req, res) {
  model.findByIdAndUpdate(
    req.body.customerid,
    {
      name: req.body.name,
      age: req.body.age,
      sex: req.body.sex,
      address: req.body.address,
    },
    function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    }
  );
});

// API for Insert data from database
app.post("/api/savedata", function (req, res) {
  var mod = new model(req.body);
  mod.save(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Inserted..!!" });
    }
  });
});

//Call by default index.html page
app.get("*", function (req, res) {
  res.sendFile(srcpath + "/index.html");
});

//Server start on given port
app.listen(port, function () {
  console.log("server start on port" + port);
});
