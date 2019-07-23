const express = require("express");
const router = express.Router();
const GeneralQuestionsModel = require("../models/GeneralQuestionsModel");
const GeneralQuestionsDetailModel = require("../models/GeneralQuestionsDetailModel");
const generalQuestionRuffInfoModel = require("../models/generalQuestionRuffInfoModel");

//Add(POST) general Question
router.post("/addGeneralQuestion", (req, res, next) => {
  const addQuestionData = new GeneralQuestionsModel({
    q_desc: req.body.q_desc
  });

  addQuestionData.save(function(err, qInfo) {
    if (err) throw err;
    var last_inserted_id = qInfo._id;
    const GeneralQuestionsDetailData = new GeneralQuestionsDetailModel({
      q_id: last_inserted_id,
      q_textField: req.body.q_textField,
      q_textField_values: req.body.q_textField_values
    });
    GeneralQuestionsDetailData.save()
      .then(result => {
        res.status(201).json({
          message: "Question Detail Added"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

//GET all general Questions through POST method
router.post("/getGeneralQuestions", (req, res, next) => {
  GeneralQuestionsModel.find()
    .exec()
    .then(generalQuestions => {
      return res.status(200).json({
        message: "successful",
        generalQuestionsInfo: generalQuestions
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//GET Question By Q_description
router.post("/getQuestionByQDesc", (req, res, next) => {
  var q_desc = req.body.q_desc;
  GeneralQuestionsModel.find({ q_desc: q_desc })
    .exec()
    .then(questionByQDesc => {
      var QuestionID = questionByQDesc[0]._id;
      GeneralQuestionsDetailModel.find({ q_id: QuestionID })
        .then(questionDetailData => {
          return res.status(200).json({
            message: "successful",
            questionLocalData: questionByQDesc,
            questionDetailLocalData: questionDetailData
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//PUT Question By ID
router.post("/updateQuestion", (req, res, next) => {
  var q_id = req.body.q_id;
  const generalQuestionData = {
    q_desc: req.body.q_desc
  };
  GeneralQuestionsModel.updateOne({ _id: q_id }, generalQuestionData)
    .exec()
    .then(generalQuestions => {
      const generalQuestionDetailData = {
        q_textField: req.body.q_textField,
        q_textField_values: req.body.q_textField_values
      };
      GeneralQuestionsDetailModel.updateMany(
        { q_id: q_id },
        generalQuestionDetailData
      )
        .then(generalQuestionsDetail => {
          return res.status(200).json({
            message: "General Question and its Detail is updated sucessfully!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//DELETE Question By ID
router.post("/deleteQuestion", (req, res, next) => {
  var q_id = req.body._id;

  GeneralQuestionsModel.deleteOne({ _id: q_id })
    .exec()
    .then(generalQuestions => {
      GeneralQuestionsDetailModel.deleteMany({ q_id: q_id })
        .exec()
        .then(deleteGeneralQuestionInfo => {
          return res.status(200).json({
            message: "Question has been deleted"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/addGeneralQuestionRuffInfo", (req, res, next) => {
  const generalQuestionRuffInfoData = new generalQuestionRuffInfoModel({
    q_info: req.body.q_info,
    q_desc: req.body.q_desc
  });

  generalQuestionRuffInfoData
    .save()
    .then(result => {
      res.status(201).json({
        message: "General Question Ruff Info Added"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getGeneralQuestionRuffInfo", (req, res, next) => {
  generalQuestionRuffInfoModel
    .find()
    .exec()
    .then(generalQuestionRuffInfo => {
      return res.status(200).json({
        message: "successful",
        generalQuestionRuffInfoData: generalQuestionRuffInfo
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
