const express = require("express");
const router = express.Router();
const Register = require("../models/customerRegisterModel");
const User = require("../models/userModel");
const categoryInfo = require("../models/categoryInfoModel");
const sectionInfo = require("../models/sectionInfoModel");
const category = require("../models/categoryModel");
const section = require("../models/createSectionModel");
const generalQuestions = require("../models/GeneralQuestionsModel");
const generalQuestionsDetail = require("../models/GeneralQuestionsDetailModel");
const chatInfoModel = require("../models/chatInfoModel");
const chatMessagesModel = require("../models/chatMessagesModel");
const TemplateModel = require("../models/TemplateModel");
const TemplateInfoModel = require("../models/TemplateInfoModel");

//GET Customer Template Informatiom
router.post("/getCustomerTemplate", (req, res) => {
  Register.find({ email: req.body.email })
    .then(customerData => {
      var template_id = customerData[0].template_id;
      var customer_name = customerData[0].first_name;

      TemplateModel.find({ _id: template_id })
        .then(templateData => {
          var tempName = templateData[0].template_name;
          TemplateInfoModel.find({ template_id: customerData[0].template_id })
            .then(templateInfoData => {
              var categoryIDs = [];
              for (i = 0; i < templateInfoData.length; i++) {
                categoryIDs[i] = templateInfoData[i].category_id;
              }
              category
                .find({ _id: { $in: categoryIDs } })
                .then(categoryData => {
                  categoryInfo
                    .find({ cat_id: { $in: categoryIDs } })
                    .then(categoryInfoData => {
                      var s_IDs = [];
                      var lookUpResponse_for_sectionData = [];

                      for (i = 0; i < categoryInfoData.length; i++) {
                        s_IDs[i] = categoryInfoData[i].section_id;
                      }
                      sectionInfo
                        .find({ section_id: { $in: s_IDs } })
                        .then(sectionInfoData => {
                          var lookUpResponse = [];
                          var section_IDs = [];
                          var q_IDs = [];
                          for (i = 0; i < sectionInfoData.length; i++) {
                            section_IDs[i] = sectionInfoData[i].section_id;
                            q_IDs[i] = sectionInfoData[i].q_id;
                          }
                          section
                            .find({ _id: { $in: section_IDs } })
                            .then(sectionData => {
                              //Start Getting Section Data
                              categoryInfoData.forEach(element => {
                                var S_ID = element.section_id;
                                var C_ID = element.cat_id;
                                let result_sectionData = sectionData.filter(
                                  obj => {
                                    return obj._id === S_ID;
                                  }
                                );
                                if (result_sectionData.length > 0) {
                                  for (
                                    let xy = 0;
                                    xy < result_sectionData.length;
                                    xy++
                                  ) {
                                    const element = result_sectionData[xy];
                                    var objLookUp_for_sectionData = {
                                      _id: element._id,
                                      section_name: element.section_name,
                                      section_desc: element.section_desc,
                                      section_isTabular:
                                        element.section_isTabular,
                                      cat_id: C_ID
                                    };
                                    lookUpResponse_for_sectionData.push(
                                      objLookUp_for_sectionData
                                    );
                                  }
                                }
                              });
                              ///////////End Getting Section Data
                              generalQuestions
                                .find({ _id: { $in: q_IDs } })
                                .then(generalQuestionsData => {
                                  var Qq_id = [];
                                  for (
                                    let i = 0;
                                    i < generalQuestionsData.length;
                                    i++
                                  ) {
                                    Qq_id[i] = generalQuestionsData[i]._id;
                                  }
                                  generalQuestionsDetail
                                    .find({ q_id: { $in: Qq_id } })
                                    .then(generalQuestionsDetailData => {
                                      sectionInfoData.forEach(
                                        sectionInfoDataElement => {
                                          var qID = sectionInfoDataElement.q_id;
                                          var sID =
                                            sectionInfoDataElement.section_id;

                                          let result = generalQuestionsData.filter(
                                            obj => {
                                              return obj._id === qID;
                                            }
                                          );
                                          let result_detailData = generalQuestionsDetailData.filter(
                                            obj => {
                                              return obj.q_id === qID;
                                            }
                                          );
                                          if (
                                            result.length > 0 &&
                                            result_detailData.length > 0
                                          ) {
                                            for (
                                              let index = 0;
                                              index < result.length;
                                              index++
                                            ) {
                                              const element = result[index];
                                              const element_detailData =
                                                result_detailData[index];
                                              var objLookUp = {
                                                _id: element._id,
                                                q_desc: element.q_desc,
                                                tooltip:
                                                  sectionInfoDataElement.q_tooltip,
                                                q_textField:
                                                  element_detailData.q_textField,
                                                q_textField_values:
                                                  element_detailData.q_textField_values,
                                                sec_id: sID
                                              };
                                              lookUpResponse.push(objLookUp);
                                            }
                                          }
                                        }
                                      );
                                      return res.status(200).json({
                                        generalQuestionsLocalData: lookUpResponse,
                                        sectionLocalData: lookUpResponse_for_sectionData,
                                        categoryLocalData: categoryData,
                                        templateID: template_id,
                                        customerName: customer_name,
                                        templateLocalData: tempName
                                      });
                                    })
                                    .catch(err => {
                                      res.status(500).json({
                                        error:
                                          "There is something wrong in Detail Question Data API"
                                      });
                                    });
                                  //END general questions details
                                })
                                .catch(err => {
                                  res.status(500).json({
                                    error: "general Question"
                                  });
                                });
                              //END general questions
                            })
                            .catch(err => {
                              res.status(500).json({
                                error: err
                              });
                            });
                          //End Sectons
                        })
                        .catch(err => {
                          res.status(500).json({
                            error: err
                          });
                        });
                      //End Sectons Infos
                    })
                    .catch(err => {
                      res.status(500).json({
                        error: err
                      });
                    });
                  //END Categories Infos
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  });
                });
              //END Categories
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
          //END Template Infos
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      //END Template
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  //END Customer Register
});
//END Route
router.post("/getCustomer", (req, res, next) => {
  Register.find()
    .exec()
    .then(customerRecords => {
      debugger;
      var Template_ID = [];
      var emails = [];
      var customerData = customerRecords;
      for (i = 0; i < customerData.length; i++) {
        Template_ID[i] = customerData[i].template_id;
        emails[i] = customerData[i].email;
      }
      TemplateModel.find({ _id: { $in: Template_ID } })
        .then(templateData => {
          var lookUpResponse = [];
          chatInfoModel
            .find({ user_email: { $in: emails } })
            .then(chatData => {
              var chat_Info_IDs = [];
              for (let i = 0; i < chatData.length; i++) {
                const element = chatData[i];
                chat_Info_IDs[i] = element._id;
              }
              chatMessagesModel
                .find({
                  chatInfo_id: { $in: chat_Info_IDs },
                  isAdminRead: false
                })
                .then(chatMessagesData => {
                  customerData.forEach(element => {
                    var c_temp_id = element.template_id;
                    var c_user_email = element.email;
                    let temp_result = templateData.filter(obj => {
                      return obj._id === parseInt(c_temp_id);
                    });
                    let chat_result = chatData.filter(obj => {
                      return obj.user_email === c_user_email;
                    });
                    var msg_result = [];
                    if (chat_result.length > 0) {
                      for (let i = 0; i < chat_result.length; i++) {
                        var chat_element = chat_result[i];
                        var res = chatMessagesData.filter(obj => {
                          return obj.chatInfo_id === chat_element._id;
                        });
                        if (res.length > 0) {
                          for (let index = 0; index < res.length; index++) {
                            msg_result.push(res[index]);
                          }
                        }
                      }
                    }
                    var objLookUp = {
                      _id: element._id,
                      first_name: element.first_name,
                      // last_name: element.last_name,
                      // customertype: element.customertype,
                      // template_id: element.template_id,
                      companyName: element.companyName,
                      // address: element.address,
                      phoneNo: element.phoneNo,
                      // businessPhoneNo: element.businessPhoneNo,
                      // businessAddress: element.businessAddress,
                      email: element.email,
                      // password: element.password,
                      template_name: temp_result[0].template_name,
                      notificationcount: msg_result.length
                    };
                    lookUpResponse.push(objLookUp);
                  });
                  return res.status(200).json({
                    customerLocalData: lookUpResponse
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
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/register", (req, res, next) => {
  Register.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        const register = new Register({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          type: req.body.type,
          template_id: req.body.template_id,
          companyName: req.body.companyName,
          address: req.body.address,
          phoneNo: req.body.phoneNo,
          businessPhoneNo: req.body.businessPhoneNo,
          businessAddress: req.body.businessAddress,
          email: req.body.email,
          password: req.body.password
        });

        register
          .save()
          .then(result => {
            const loginUser = new User({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              type: req.body.type,
              email: req.body.email,
              password: req.body.password
            });
            loginUser
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
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
      }
    });
});
router.post("/getCustomerByEmail", (req, res, next) => {
  var email = req.body.email;
  Register.find({ email: email })
    .exec()
    .then(result => {
      res.status(201).json({
        customerData: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
