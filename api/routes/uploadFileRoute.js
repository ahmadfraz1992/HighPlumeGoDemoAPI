const express = require("express");
const router = express.Router();
const uploadFileModel = require("../models/uploadFileModel");

router.post("/postFile", (req, res, next) => {
  const uploadFileData = new uploadFileModel({
    file_name: req.body.fileName,
    file: req.body.file
  });
  uploadFileData
    .save()
    .then(result => {
      res.status(201).json({
        message: "File information added"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getPostedFile", (req, res, next) => {
  uploadFileModel
    .find()
    .exec()
    .then(postedData => {
      return res.status(200).json({
        fileLocalData: postedData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
