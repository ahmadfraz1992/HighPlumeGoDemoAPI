const express = require("express");
const router = express.Router();
const categoryInfo = require("../models/categoryInfoModel");
router.post("/AddCategoryInfo", (req, res, next) => {
  var categoryInfoDataArray = req.body.categoryInfoData;
  for (let i = 0; i < categoryInfoDataArray.length; i++) {
    const categoryData = new categoryInfo({
      cat_id: categoryInfoDataArray[i].cat_id,
      section_id: categoryInfoDataArray[i].checkedRowId
    });

    categoryData
      .save()
      .then(result => {
        res.status(201).json({
          message: "Category information added"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
});

router.post("/getcategoryInfo", (req, res, next) => {
  var catID = req.body.cat_id;
  categoryInfo
    .find({ cat_id: catID })
    .exec()
    .then(Category => {
      return res.status(200).json({
        categoryInfoLocalData: Category
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//Get information on template
router.post("/getcategoryInfoTemplate", (req, res, next) => {
  var Template_id = req.body.Template_id;
  categoryInfo
    .find({ cat_id: Template_id })
    .exec()
    .then(Category => {
      return res.status(200).json({
        categoryLocalData: Category
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getcategoryInfoWithParam", (req, res, next) => {
  var catID = req.body.cat_id;
  categoryInfo
    .find({ cat_id: catID })
    .exec()
    .then(Category => {
      return res.status(200).json({
        categoryLocalData: Category
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getcategoryInfoWithoutPara", (req, res, next) => {
  categoryInfo
    .find()
    .exec()
    .then(Category => {
      return res.status(200).json({
        categoryLocalData: Category
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/updateCategoryInfo", (req, res, next) => {
  var cat_id = req.body.cat_id;
  //DELETE Many Categories From categoryInfo Collection that are matched with the cat_id
  categoryInfo
    .deleteMany({ cat_id: cat_id })
    .exec()
    .then(deleteCategoryInfo => {
      //INSERT Category Info
      const categoryUpdatedDataArray = req.body.categortyUpdatedData;
      for (let i = 0; i < categoryUpdatedDataArray.length; i++) {
        const categoryInfoData = new categoryInfo({
          cat_id: categoryUpdatedDataArray[i].cat_id,
          section_id: categoryUpdatedDataArray[i].section_id
        });
        categoryInfoData
          .save()
          .then(result => {
            res.status(201).json({
              message: "Category information added"
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
