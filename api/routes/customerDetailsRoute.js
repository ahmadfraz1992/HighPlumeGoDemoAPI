const express = require("express");
const router = express.Router();
const customerDetailsModel = require("../models/customerDetailsModel");

router.post("/addCustomerDetails", (req, res, next) => {
  const customerDetailsData = new customerDetailsModel({
    c_desc: req.body.c_desc,
    tooltip: req.body.tooltip
  });

  customerDetailsData
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Customer Details Added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getCustomerDetails", (req, res, next) => {
  customerDetailsModel
    .find()
    .exec()
    .then(customerData => {
      console.log(customerData);
      return res.status(200).json({
        message: "successful",
        customerLocalData: customerData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
