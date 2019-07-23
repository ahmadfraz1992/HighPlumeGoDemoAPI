const express = require("express");
const router = express.Router();
const chatMessagesModel = require("../models/chatMessagesModel");
const chatInfoModel = require("../models/chatInfoModel");

router.post("/addGetChatMessages", (req, res, next) => {
  var email = req.body.user_email;
  var template_id = req.body.template_id;
  var section_id = req.body.section_id;
  var q_id = req.body.q_id;
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
          isAdminRead: true
        });

        chatMessagesData
          .save()
          .then(chatMessageData => {
            chatMessagesModel
              .updateMany(
                { chatInfo_id: chatInfo_id },
                { $set: { isAdminRead: true } }
              )
              .then(ReadedData => {
                chatMessagesModel
                  .find({ chatInfo_id: chatInfo_id })
                  .then(SuccessChatMessagesData => {
                    console.log(SuccessChatMessagesData);
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
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
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
