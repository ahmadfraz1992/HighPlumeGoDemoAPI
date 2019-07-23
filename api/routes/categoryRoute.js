const express = require("express");
const router = express.Router();
const category = require("../models/categoryModel");
const categoryInfo = require("../models/categoryInfoModel");
const categoryRuffInfoModel = require("../models/categoryRuffInfoModel");
const Section = require("../models/createSectionModel");

// process.env.SECRET_KEY = "secret";
router.post("/getTemplateInfoDialog", (req, res, next) => {
  var CatID = req.body.cat_id;
  categoryInfo
    .find({ cat_id: CatID })
    .then(categoryInfoData => {
      var sectinID = [];
      for (i = 0; i < categoryInfoData.length; i++) {
        sectinID[i] = categoryInfoData[i].section_id;
      }
      Section.find({ _id: { $in: sectinID } })
        .then(sectionName => {
          category.find({ _id: CatID }).then(CategoryName => {
            return res.status(200).json({
              categoryNameLocalData: CategoryName,
              sectionNameLocalData: sectionName,
              categoryInfoLocalData: categoryInfoData
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
      res.status(500).json({
        error: err
      });
    });
});
router.post("/addCategoryInformation", (req, res, next) => {
  const categoryData = new category({
    cat_name: req.body.name,
    cat_Type: req.body.type
  });

  categoryData
    .save()
    .then(result => {
      res.status(201).json({
        categoryInformation: result,
        message: "category table"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getCategoryInformation", (req, res, next) => {
  category
    .find()
    .exec()
    .then(categoryData => {
      return res.status(200).json({
        categoryLocalData: categoryData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getCategoryInformationWithPara", (req, res, next) => {
  var cat_name = req.body.cat_name;
  category
    .find({ cat_name: cat_name })
    .exec()
    .then(categoryData => {
      return res.status(200).json({
        message: "successful",
        categoryLocalData: categoryData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/updateCategory", (req, res, next) => {
  var category_id = req.body.cat_id;
  const categoryData = {
    cat_name: req.body.cat_name,
    cat_Type: req.body.cat_Type
  };
  //Update Category Data From categories Collection
  category
    .updateOne({ _id: category_id }, categoryData)
    .exec()
    .then(cat_Data => {
      return res.status(200).json({
        message: "Category has been updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/deleteCategoryData", (req, res, next) => {
  var cat_id = req.body._id;

  category
    .deleteOne({ _id: cat_id })
    .exec()
    .then(deleteSection => {
      categoryInfo
        .deleteMany({ cat_id: cat_id })
        .exec()
        .then(deleteCategoryInfo => {
          return res.status(200).json({
            message: "Category and its Information has been deleted"
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

router.post("/addcategoryRuffInfo", (req, res, next) => {
  const categoryRuffInfoData = new categoryRuffInfoModel({
    cat_info: req.body.cat_info,
    cat_desc: req.body.cat_desc
  });

  categoryRuffInfoData
    .save()
    .then(result => {
      res.status(201).json({
        message: "category Ruff Info Added"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getcategoryRuffInfo", (req, res, next) => {
  categoryRuffInfoModel
    .find()
    .exec()
    .then(categoryRuffInfo => {
      return res.status(200).json({
        categoryRuffInfoData: categoryRuffInfo
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
