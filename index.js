const express = require("express");
const oracledb = require("oracledb");
require("./model/db");

const app = express();
const port = 3000;
const routes = require("./route.js");

async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "xxxxxx",
      password: "xxxx",
      connectString: "localhost:1521/zCz",
    });

    console.log("connected to database");
    // run query to get all employees
    result = await connection.execute(`select * from xx_vmi_inv_mgmt_dm`);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send("query send no rows");
    } else {
      //send all employees
      console.log("xx_vmi_inv_mgmt_dm", result.rows);
      return res.send(result.rows);
    }
  }
}

// to accept body request using body parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//intilize routes
app.use("/api", routes);
//get /employess
app.get("/employees", function (req, res) {
  selectAllEmployees(req, res);
});

app.listen(port, () =>
  console.log("nodeOracleRestApi app listening on port %s!", port)
);
