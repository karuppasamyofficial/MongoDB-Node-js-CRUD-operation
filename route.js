const express = require("express");
const employeeController = require("./controllers/employeeController.js");

const router = express.Router();
router.get("/", function (req, res) {
  res.send("hello world");
});
//using query parameter
router.get("/getusername/:username", function (req, res) {
  res.send(req.query);
});
router.post("/postCall", function (req, res) {
  console.log("vck", req.body);
  res.send(req.body.password);
});
router.get("/employees", employeeController.getemployees);
//to get the partcular make endpoints from frond like this
//http://localhost:3000/api/employees/6037548820477f2264d5cb54
router.get("/employees/:id", employeeController.getemployeeById);

router.post(
  "/emplhandleinsert_update",
  employeeController.emplhandleinsert_update
);

router.delete("/employees/:id", employeeController.deleteemployeeById);

module.exports = router;
