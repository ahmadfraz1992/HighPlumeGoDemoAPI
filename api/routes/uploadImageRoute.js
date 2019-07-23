const express = require("express");
const router = express.Router();
const uploadImageModel = require("../models/uploadImageModel");

router.post("/postImage", (req, res, next) => {
  const uploadImageData = new uploadImageModel({
    img: req.body.img
  });
  uploadImageData
    .save()
    .then(result => {
      res.status(201).json({
        message: "Image information added"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getPostedImage", (req, res, next) => {
  uploadImageModel
    .find({ _id: 10 })
    .exec()
    .then(postedData => {
      return res.status(200).json({
        imageLocalData: postedData
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
