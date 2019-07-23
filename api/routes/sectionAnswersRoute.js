const express = require("express");
const router = express.Router();
const sectionAnswers = require("../models/sectionAnswersModel");
router.post("/addSectionAnswer", (req, res, next) => {
  var request = req.body.arrayAnser;

  var temppID = request[0].tempID;
  var cat_id = request[0].catID;
  var secID = request[0].secID;
  var email = request[0].email;
  sectionAnswers
    .deleteMany({
      email: email,
      template_id: temppID,
      cat_id: cat_id,
      section_id: secID
    })
    .exec()
    .then(sectionData => {
      //console.log(sectionData);
      for (let i = 0; i < request.length; i++) {
        const sectionAnswerData = new sectionAnswers({
          email: request[i].email,
          template_id: request[i].tempID,
          cat_id: request[i].catID,
          section_id: request[i].secID,
          q_id: request[i].q_id,
          row_id: request[i].row_id,
          answer: request[i].answer
        });
        sectionAnswerData
          .save()
          .then(result => {
            res.status(201).json({
              message: "Record Added Successfully!"
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
router.post("/getSectionAnswers", (req, res, next) => {
  var secID = req.body.section_id;
  var catID = req.body.cat_id;
  var tempID = req.body.template_id;
  var email = req.body.email;
  sectionAnswers
    .find({
      email: email,
      template_id: tempID,
      cat_id: catID,
      section_id: secID
    })
    .then(result => {
      res.status(201).json({
        sectionAnswersLocalData: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/FlagSection", (req, res, next) => {
  var FLagData = req.body.flagData;
  var secID = [];
  var catID = [];
  var tempID = [];
  var email = [];
  for (let i = 0; i < FLagData.length; i++) {
    email[i] = FLagData[i].email;
    tempID[i] = FLagData[i].template_id;
    catID[i] = FLagData[i].cat_id;
    secID[i] = FLagData[i].section_id;
  }
  sectionAnswers
    .find({
      email: { $in: email },
      template_id: { $in: tempID },
      cat_id: { $in: catID },
      section_id: { $in: secID }
    })
    .then(result => {
      res.status(201).json({
        sectionAnswersLocalData: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
