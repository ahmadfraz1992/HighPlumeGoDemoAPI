const express = require("express");
const router = express.Router();
const Register = require("../models/userModel");
const UserLogin = require("../models/userModel");

// // Registration for New Users in Users Collection
router.post("/register", (req, res) => {
  Register.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "This email address already exists"
        });
      } else {
        const register = new Register({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          type: req.body.type,
          email: req.body.email,
          password: req.body.password
        });

        register
          .save()
          .then(result => {
            res.status(201).json({
              message: "User created",
              registerLocalData: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    });
});
//User Login from Users Collection
router.post("/login", (req, res) => {
  UserLogin.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed at line 12"
        });
      }

      if (req.body.password === user[0].password) {
        return res.status(200).json({
          message: "Auth successful",
          user: user
        });
      } else {
        return res.status(400).json({
          message: "Auth failed 64"
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: "BAD REQUEST"
      });
    });
});
module.exports = router;
