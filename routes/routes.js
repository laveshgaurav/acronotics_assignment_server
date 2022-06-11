// imports
const express = require("express");
const db = require("../db/db");

// router initialisation
const router = express.Router();

// base route check
router.get("/", (req, res) => {
  try {
    res.json("Success");
  } catch (e) {
    console.log(e);
  }
});

// principal signup route
router.post("/principal/signup", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.send({
        message: "Fill all the required fields",
        status: false,
      });
    }
    var statement = `INSERT INTO Principal (full_name, email, pass, role) VALUES ('${name}','${email}','${password}','Principal');`;
    db.query(statement, (err, results) => {
      if (err)
        return res.send({
          message: err?.sqlMessage,
          status: false,
        });
      return res.send({
        message: "Account Created, You can now login",
        status: true,
      });
    });
  } catch (e) {
    return res.send({
      message: e.message,
      status: false,
    });
  }
});

// principal login route
router.post("/principal/login", (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email.trim() || !pass.trim()) {
      return res.status(200).send({
        message: "Fill all the required fields",
        status: false,
      });
    }
    var statement = `SELECT * FROM Principal WHERE email="${email}"`;
    db.query(statement, (err, results) => {
      if (err)
        return res.status(200).send({
          message: err?.sqlMessage,
          status: false,
        });
      if (results[0].pass !== pass) {
        return res.status(200).send({
          message: "Invalid Credentials",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Login Success",
          status: true,
          data: {
            ...results[0],
            pass: "********",
          },
        });
      }
    });
  } catch (e) {
    return res.status(200).send({
      message: e.message,
      status: false,
    });
  }
});

// new teacher creation route
router.post("/principal/newTeacher", (req, res) => {
  try {
    const { fullname, email, password, p_id } = req.body;
    if (!fullname.trim() || !email.trim() || !password.trim()) {
      return res.send({
        message: "Fill all the required fields",
        status: false,
      });
    }
    const statement = `INSERT INTO Teacher (full_name,email,pass,role,class,p_id) VALUES ('${fullname}',"${email}","${password}","Teacher","${req.body.class}","${p_id}")`;
    db.query(statement, (err, resp) => {
      if (err) {
        return res.status(200).send({
          message: err?.sqlMessage,
          status: false,
        });
      }
      return res.status(200).send({
        message: "Teacher Created",
        status: true,
      });
    });
  } catch (e) {
    return res.status(200).send({
      message: e.message,
      status: false,
    });
  }
});

// delete teacher route
router.post("/principal/deleteTeacher", (req, res) => {
  try {
    const { t_id, p_id } = req.body;
    const statement = `DELETE FROM Teacher WHERE t_id="${t_id}" AND p_id="${p_id}"`;
    db.query(statement, (err, resp) => {
      if (err) {
        return res.status(200).send({
          message: err?.sqlMessage,
          status: false,
        });
      } else {
        res.status(200).send({
          message: resp,
          status: true,
        });
      }
    });
  } catch (e) {
    return res.status(200).send({
      message: e.message,
      status: false,
    });
  }
});

// get users sccording to principal id route
router.post("/principal/getTeachers", (req, res) => {
  try {
    const { p_id } = req.body;
    const statement = `SELECT * FROM Teacher WHERE p_id="${p_id}"`;
    db.query(statement, (err, resp) => {
      if (err) {
        res.send({
          message: err?.sqlMessage,
          status: false,
        });
      } else {
        res.send({
          data: resp,
          status: true,
        });
      }
    });
  } catch (e) {
    return res.send({
      message: e.message,
      status: false,
    });
  }
});

module.exports = router;
