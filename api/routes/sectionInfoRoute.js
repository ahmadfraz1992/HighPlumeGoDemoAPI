const express = require("express");
const router = express.Router();
const sectionInfo = require("../models/sectionInfoModel");
const section = require("../models/createSectionModel");
const getGeneralQuestions = require("../models/GeneralQuestionsModel");

router.post("/getSectionInfoDialog", (req, res) => {
  var section_ID = req.body.Section_id;
  sectionInfo
    .find({ section_id: section_ID })
    .then(sectionInfoData => {
      var q_IDs = [];
      for (i = 0; i < sectionInfoData.length; i++) {
        q_IDs[i] = sectionInfoData[i].q_id;
      }
      getGeneralQuestions
        .find({ _id: { $in: q_IDs } })
        .then(generalQuestionsData => {
          section
            .find({ _id: section_ID })
            .then(sectionName => {
              return res.status(200).json({
                message: "successful",
                sectionNameLocalData: sectionName,
                generalQuestionsLocalData: generalQuestionsData,
                sectionInfoLocalData: sectionInfoData
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
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/selectedSectionQuestions", (req, res) => {
  let templateData = req.body.templateData;

  var section_ID = [];
  for (i = 0; i < templateData.length; i++) {
    section_ID[i] = templateData[i].section_id;
  }
  sectionInfo
    .find({ section_id: { $in: section_ID } })
    .then(sectionQuestionsData => {
      return res.status(200).json({
        sectionQuestionsLocalData: sectionQuestionsData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/saveSectionInfo", (req, res, next) => {
  var testData = req.body.testUserData;
  for (let i = 0; i < testData.length; i++) {
    const sectionInfoData = new sectionInfo({
      section_id: testData[i].section_id,
      q_id: testData[i].q_id,
      q_tooltip: testData[i].q_tooltip
    });
    sectionInfoData
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
});

router.post("/getSectionInformationWithParams", (req, res, next) => {
  var sec_ID = req.body.sec_ID;
  sectionInfo
    .find({ section_id: sec_ID })
    .exec()
    .then(sectionData => {
      return res.status(200).json({
        message: "successful",
        sectionLocalData: sectionData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getSectionQuestions", (req, res, next) => {
  var section_id = req.body.section_id;
  lookUpResponse_for_sectionQuestionData = [];
  sectionInfo
    .find({ section_id: section_id })
    .exec()
    .then(sectionInfoData => {
      var q_ID = [];
      for (i = 0; i < sectionInfoData.length; i++) {
        q_ID[i] = sectionInfoData[i].q_id;
      }
      getGeneralQuestions
        .find({ _id: { $in: q_ID } })
        .then(sectionQuestionsData => {
          sectionQuestionsData.forEach(element => {
            var Q_ID = element._id;
            let result = sectionInfoData.filter(obj => {
              return obj.q_id === Q_ID;
            });
            if (result.length > 0) {
              var objLookUp_for_sectionQuestionData = {
                section_id: result[0].section_id,
                q_id: result[0].q_id,
                q_desc: element.q_desc,
                q_tooltip: result[0].q_tooltip
              };
              lookUpResponse_for_sectionQuestionData.push(
                objLookUp_for_sectionQuestionData
              );
            }
          });
          return res.status(200).json({
            sectionQuestionData: lookUpResponse_for_sectionQuestionData
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
router.post("/updateSavedQuestion", (req, res, next) => {
  var section_id = req.body.section_id;

  sectionInfo
    .updateMany({ section_id: section_id })
    .exec()
    .then(sectionData => {
      return res.status(200).json({
        message: "Section Questions has been updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/deleteSavedQuestion", (req, res, next) => {
  var section_id = req.body.section_id;

  sectionInfo
    .deleteMany({ section_id: section_id })
    .exec()
    .then(sectionData => {
      return res.status(200).json({
        message: "Section Questions has been deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
