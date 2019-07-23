const express = require("express");
const router = express.Router();
const createSection = require("../models/createSectionModel");
const getSection = require("../models/createSectionModel");
const GeneralQuestionsModel = require("../models/GeneralQuestionsModel");
const getSectionByName = require("../models/createSectionModel");
const deleteSection = require("../models/createSectionModel");
const sectionInfoQuestion = require("../models/sectionInfoModel");
const createSectionInfoModel = require("../models/createSectionInfoModel");

router.post("/createSection", (req, res, next) => {
  const createSectionData = new createSection({
    section_name: req.body.section_name,
    section_desc: req.body.section_desc,
    section_isTabular: req.body.section_isTabular
  });

  createSectionData
    .save()
    .then(result => {
      res.status(201).json({
        message: "Section Created",
        sectionLocalData: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getSectionInfo", (req, res, next) => {
  getSection
    .find()
    .exec()
    .then(sectionData => {
      GeneralQuestionsModel.find()
        .then(GeneralQuestionsData => {
          return res.status(200).json({
            generalQuestionsLoccalData: GeneralQuestionsData,
            sectionLocalData: sectionData
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            message: "Question Table Error"
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "section Table Error"
      });
    });
});

//GET a perticuler information of section by section_name
router.post("/getSectionInformation", (req, res, next) => {
  var sec_name = req.body.section_name;
  getSectionByName
    .find({ section_name: sec_name })
    .exec()
    .then(sectionData => {
      GeneralQuestionsModel.find()
        .then(GeneralQuestionsData => {
          return res.status(200).json({
            generalQuestionsLoccalData: GeneralQuestionsData,
            sectionLocalData: sectionData
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            message: "Question Table Error"
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/updateSectionData", (req, res, next) => {
  var section_id = req.body.section_id;
  const sectionData = {
    section_name: req.body.section_name,
    section_desc: req.body.section_desc,
    section_isTabular: req.body.section_isTabular
  };
  //Update Section Data From Sections Collection
  getSection
    .updateOne({ _id: section_id }, sectionData)
    .exec()
    .then(sectionData => {
      sectionInfoQuestion
        .deleteMany({ section_id: section_id })
        .exec()
        .then(deletesectionInfo => {
          var testData = req.body.testUserData;
          for (let i = 0; i < testData.length; i++) {
            const sectionInfoData = new sectionInfoQuestion({
              section_id: testData[i].section_id,
              q_id: testData[i].q_id,
              q_tooltip: testData[i].q_tooltip
            });
            sectionInfoData
              .save()
              .then(result => {
                res.status(201).json({
                  message: "Record added Successfully!"
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
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/deleteSection", (req, res, next) => {
  var s_id = req.body._id;

  deleteSection
    .deleteOne({ _id: s_id })
    .exec()
    .then(deleteSection => {
      sectionInfoQuestion
        .deleteMany({ section_id: s_id })
        .exec()
        .then(deleteSectionSavedQuestions => {
          return res.status(200).json({
            message: "Section and its detail information has been delted"
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

router.post("/addSectionRuffInfo", (req, res, next) => {
  const createSectionInfoData = new createSectionInfoModel({
    s_info: req.body.s_info,
    s_desc: req.body.s_desc
  });

  createSectionInfoData
    .save()
    .then(result => {
      res.status(201).json({
        message: "Section Info Added"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getSectionRuffInfo", (req, res, next) => {
  createSectionInfoModel
    .find()
    .exec()
    .then(SectionInfo => {
      return res.status(200).json({
        message: "successful",
        SectionRuffInfoData: SectionInfo
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
