const express = require("express");
const router = express.Router();
const chatInfoModel = require("../models/chatInfoModel");
const chatMessagesModel = require("../models/chatMessagesModel");

router.post("/addGetChatInformation", (req, res, next) => {
  var email = req.body.user_email;
  var template_id = req.body.template_id;
  var section_id = req.body.section_id;
  var q_id = req.body.q_id;
  let last_inserted_id;
  chatInfoModel
    .find({
      user_email: email,
      template_id: template_id,
      section_id: section_id,
      q_id: q_id
    })
    .then(info => {
      if (info.length > 0) {
        var chatInfo_id = info[0]._id;
        const chatMessagesData = new chatMessagesModel({
          chatInfo_id: info[0]._id,
          message: req.body.chatMessage,
          dateTime: req.body.dateTime,
          isUser: req.body.isUser,
          isAdminRead: false
        });

        chatMessagesData
          .save()
          .then(chatMessageData => {
            var name = req.body.isUser;
            console.log(chatMessageData);
            chatMessagesModel
              .find({ isUser: name, chatInfo_id: chatInfo_id })
              .then(SuccessChatMessagesData => {
                return res.status(200).json({
                  chatMessagesLocalData: SuccessChatMessagesData
                });
              })
              .catch(err => {
                console.log(err);
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
      } else {
        const chatInfoData = new chatInfoModel({
          user_email: req.body.user_email,
          template_id: req.body.template_id,
          section_id: req.body.section_id,
          q_id: req.body.q_id
        });
        chatInfoData.save(function(err, chatInfo) {
          if (err) throw err;
          last_inserted_id = chatInfo._id;
          ///////////////////
          console.log(last_inserted_id);
          const chatMessagesData = new chatMessagesModel({
            chatInfo_id: last_inserted_id,
            message: req.body.chatMessage,
            dateTime: req.body.dateTime,
            isUser: req.body.isUser,
            isAdminRead: false
          });
          chatMessagesData
            .save()
            .then(chatMessageData => {
              var name = req.body.isUser;
              // console.log(chatMessageData);
              // { isUser: name }
              chatMessagesModel
                .find({ chatInfo_id: last_inserted_id })
                .then(SuccessChatMessagesData => {
                  return res.status(200).json({
                    chatMessagesLocalData: SuccessChatMessagesData
                  });
                })
                .catch(err => {
                  console.log(err);
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
          /////////////////
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/getChatMessages", (req, res, next) => {
  var email = req.body.user_email;
  var tempID = req.body.template_id;
  var secID = req.body.section_id;
  var qID = req.body.q_id;
  var name = req.body.isUser;
  chatInfoModel
    .find({
      user_email: email,
      template_id: tempID,
      section_id: secID,
      q_id: qID
    })
    .then(result => {
      if (result.length > 0) {
        var chatInfoID = result[0]._id;
        // console.log(chatInfoID);
        chatMessagesModel
          .find({ chatInfo_id: chatInfoID })
          .then(SuccessChatMessagesData => {
            return res.status(200).json({
              chatMessagesLocalData: SuccessChatMessagesData
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      } else {
        return res.status(200).json({
          chatMessagesLocalData: []
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
