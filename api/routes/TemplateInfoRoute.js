const express = require("express");
const router = express.Router();
const TemplateInfoModel = require("../models/TemplateInfoModel");

router.post("/AddTemplateInfo", (req, res, next) => {
  var tempData = req.body.templateInfoData;

  for (let i = 0; i < tempData.length; i++) {
    const tempInfoData = new TemplateInfoModel({
      template_id: tempData[i].temp_id,
      category_id: tempData[i].checkedRowId
    });
    tempInfoData
      .save()
      .then(result => {
        res.status(201).json({
          templateInfoLocalData: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
});

router.post("/getTemplateInfo", (req, res, next) => {
  var tempID = req.body.temp_id;
  TemplateInfoModel.find({ template_id: tempID })
    .exec()
    .then(template => {
      return res.status(200).json({
        tempInfoLocalData: template
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/updateTemplateInfo", (req, res, next) => {
  //DELETE Many Templates From templateInfo Collection that are matched with the temp_id
  var temp_id = req.body.temp_id;
  TemplateInfoModel.deleteMany({ template_id: temp_id })
    .exec()
    .then(deleteTemplateInfo => {
      //INSERT Template Info
      var tempData = req.body.templateUpdatedData;
      for (let i = 0; i < tempData.length; i++) {
        const templateInfoData = new TemplateInfoModel({
          template_id: tempData[i].template_id,
          category_id: tempData[i].category_id
        });
        templateInfoData
          .save()
          .then(result => {
            res.status(201).json({
              templateInfoLocalData: result
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
module.exports = router;
