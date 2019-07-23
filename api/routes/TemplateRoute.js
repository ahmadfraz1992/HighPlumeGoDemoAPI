const express = require("express");
const router = express.Router();
const template = require("../models/TemplateModel");
const TemplateInfoModel = require("../models/TemplateInfoModel");
const TemplateRuffInfoModel = require("../models/TemplateRuffInfoModel");
const category = require("../models/categoryModel");

router.post("/getTemplateInfoDialog", (req, res, next) => {
  var TempID = req.body.temp_id;
  TemplateInfoModel.find({ template_id: TempID })
    .then(templateInfoData => {
      var categoryIDs = [];
      for (i = 0; i < templateInfoData.length; i++) {
        categoryIDs[i] = templateInfoData[i].category_id;
      }
      category
        .find({ _id: { $in: categoryIDs } })
        .then(CategoryName => {
          template.find({ _id: TempID }).then(templateName => {
            return res.status(200).json({
              templateNameLocalData: templateName,
              CategoryNameLocalData: CategoryName,
              templateInfoLocalData: templateInfoData
            });
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/addTemplateInformation", (req, res, next) => {
  const templateData = new template({
    template_name: req.body.name,
    template_Type: req.body.type
  });

  templateData
    .save()
    .then(result => {
      res.status(201).json({
        templateInformation: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getTemplateInformation", (req, res, next) => {
  template
    .find()
    .exec()
    .then(templateData => {
      return res.status(200).json({
        templateLocalData: templateData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getTemplateInformationWithPara", (req, res, next) => {
  var temp_name = req.body.temp_name;
  template
    .find({ template_name: temp_name })
    .exec()
    .then(templateData => {
      return res.status(200).json({
        templateLocalData: templateData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/updateTemplateData", (req, res, next) => {
  var template_id = req.body.temp_id;
  const templateData = {
    template_name: req.body.temp_name,
    template_Type: req.body.temp_Type
  };
  //Update Category Data From categories Collection
  template
    .updateOne({ _id: template_id }, templateData)
    .exec()
    .then(temp_Data => {
      return res.status(200).json({
        message: "Template has been updated",
        TemplateLocalData: temp_Data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/deleteTemplateData", (req, res, next) => {
  var temp_id = req.body._id;

  template
    .deleteOne({ _id: temp_id })
    .exec()
    .then(deleteTemplate => {
      TemplateInfoModel.deleteMany({ template_id: temp_id })
        .exec()
        .then(deleteCategoryInfo => {
          return res.status(200).json({
            message: "Template and its Information has been deleted"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/addTemplateRuffInfo", (req, res, next) => {
  const templateRuffInfoData = new TemplateRuffInfoModel({
    temp_info: req.body.temp_info,
    temp_desc: req.body.temp_desc
  });
  templateRuffInfoData
    .save()
    .then(result => {
      res.status(201).json({
        message: "template Ruff Info Added"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getTemplateRuffInfo", (req, res, next) => {
  TemplateRuffInfoModel.find()
    .exec()
    .then(templateRuffInfo => {
      return res.status(200).json({
        templateRuffInfoData: templateRuffInfo
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
