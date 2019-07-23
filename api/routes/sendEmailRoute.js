const express = require("express");
var nodemailer = require("nodemailer");
const router = express.Router();
const Register = require("../models/sendEmailModel");
const userStatusModel = require("../models/userStatusModel");
// const data = require("../../../index.html");
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "reactdeveloper27@gmail.com",
    pass: "xprt1234"
  }
});
var rand, mailOptions, host, link;
smtpTransport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
// router.get("/", function(req, res) {
//   res.sendfile("index.html");
// });
router.post("/send", (req, res) => {
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  link = "http://" + req.get("host") + "/sendemail/verify?id=" + rand;
  mailOptions = {
    from: "reactdeveloper27@gmail.com",
    to: req.body.email,
    subject: "Please confirm your Email account",
    html:
      "<form method=POST action=http://localhost:6005/sendemail/verify:id" +
      rand +
      "><h1>Dear Customer...</h1><p>Please Verify Account</p><button type=submit>Click Here</button></form>"
    // "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
    //   link +
    //   ">Click here to verify</a>",

    // "Hello,\n\n" +
    // "Please verify your account by clicking the link: \nhttp://" +
    // req.headers.host +
    // "/sendemail/verify" +
    // rand +
    // ".\n"

    // "<form method=POST action=http://localhost:6005/sendemail/verify?id" +
    // rand +
    // "><h1>Dear Customer...</h1><p>Please Verify Account</p><button type=submit>Click Here</button></form>"
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      Register.find({
        email: req.body.email
      })
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
              type: "Customer",
              template_id: req.body.template_id,
              companyName: req.body.companyName,
              address: req.body.address,
              phoneNo: req.body.phoneNo,
              businessPhoneNo: req.body.businessPhoneNo,
              businessAddress: req.body.businessAddress,
              email: req.body.email,
              password: req.body.password,
              isActive: false
            });
            register.save(function(err, UInfo) {
              if (err) throw err;
              var last_inserted_id = UInfo._id;
              const userStatusData = new userStatusModel({
                user_id: last_inserted_id,
                random_No: rand
              });
              userStatusData
                .save()
                .then(result => {
                  res.status(201).json({
                    message: "User created"
                  });
                  res.end("send");
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  });
                });
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});
router.get("/verify:id", (req, res) => {
  console.log(req.query.id);
  userStatusModel
    .find({
      random_No: req.query.id
    })
    .then(result => {
      const updateIsActiveUser = {
        isActive: true
      };
      if (result > 0) {
        Register.updateOne(
          {
            _id: result.user_id
          },
          updateIsActiveUser
        )
          .then(userIsActivated => {
            return res.status(200).json({
              message: "User Activated"
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
// router.get("/verify", function(req, res) {
//   console.log(req.protocol + ":/" + req.get("host"));
//   if (req.protocol + "://" + req.get("host") == "http://" + host) {
//     console.log("Domain is matched. Information is from Authentic email");
//     if (req.query.id == rand) {
//       console.log("email is verified");
//       res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
//     } else {
//       console.log("email is not verified");
//       res.end("<h1>Bad Request</h1>");
//     }
//   } else {
//     res.end("<h1>Request is from unknown source");
//   }
// });
module.exports = router;
