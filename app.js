// dependency imports
const express = require("express");
const cors = require("cors");

// local imports
const routes = require("./routes/routes");
const db = require("./db/db");

// express app initialisation
const app = express();

// cprs and url encoded middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routing
app.use("/", routes);

// db connection
db.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

// server start
app.listen(3000, () => {
  console.log("Server is running on port 5000");
});
