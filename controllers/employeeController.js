const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
exports.getemployees = function (req, res) {
  Employee.find(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("First function call : ", docs);
      res.send(docs);
    }
  });
};
exports.getemployeeById = function (req, res) {
  // Employee.findById(req.params.id, (err, doc) => {

  // });
  Employee.findById(req.params.id, function (err, user) {
    console.log("findById", user);

    res.send(user);
  });

  // res.send("sabhbk")
};
exports.deleteemployeeById = function (req, res) {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    res.send(doc);
  });
};

exports.emplhandleinsert_update = function (req, res) {
  if (req.body._id) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
      res.send("update successfully");
    });
  } else {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
      if (!err) {
        res.send("insertemployee sucessfully");
      } else {
        res.send("insertemployee faild");
      }
    });
  }
};
