const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
const cors = require("cors");
// const expressValidator = require("express-validator");
// const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const usersRoutes = require("./api/routes/usersRoute");

const categoryInfoRoutes = require("./api/routes/categoryInfoRoute");

const customerRegisterRoutes = require("./api/routes/customerRegisterRoute");
const customerDetailsRoute = require("./api/routes/customerDetailsRoute");
const createSectionRoutes = require("./api/routes/createSectionRoutes");
const sectionInfoRoute = require("./api/routes/sectionInfoRoute");
const categoryRoutes = require("./api/routes/categoryRoute");
const generalQuestionsRoute = require("./api/routes/generalQuestionsRoute");
const sectionAnswersRoute = require("./api/routes/sectionAnswersRoute");
const chatInfoRoute = require("./api/routes/chatInfoRoute");
const chatMessagesRoute = require("./api/routes/chatMessagesRoute");
const uploadImageRoute = require("./api/routes/uploadImageRoute");
const uploadFileRoute = require("./api/routes/uploadFileRoute");
const TemplateRoute = require("./api/routes/TemplateRoute");
const TemplateInfoRoute = require("./api/routes/TemplateInfoRoute");
const sendEmailRoute = require("./api/routes/sendEmailRoute");
//give global promises to the mongoose promises
mongoose.Promise = global.Promise;
//connection with mongodb
mongoose
  .connect("mongodb://localhost:27017/LoanerApp", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

//Init App
const app = express();

//set public folder
app.use(express.static(path.join(__dirname, "/index.html")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "/index.html"));
});

app.use(cors());

app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: "20mb"
}));
app.use(bodyParser.json({
  limit: "20mb"
}));

//All Routes
app.use("/users", usersRoutes);

app.use("/categoryInfo", categoryInfoRoutes);
app.use("/category", categoryRoutes);

app.use("/customerRegister", customerRegisterRoutes);
app.use("/customerDetails", customerDetailsRoute);
app.use("/createSection", createSectionRoutes);
app.use("/sectionInfo", sectionInfoRoute);
app.use("/generalQuestions", generalQuestionsRoute);
app.use("/sectionAnswers", sectionAnswersRoute);
app.use("/chatInfo", chatInfoRoute);
app.use("/chatMessages", chatMessagesRoute);
app.use("/uploadImage", uploadImageRoute);
app.use("/uploadFile", uploadFileRoute);
app.use("/templates", TemplateRoute);
app.use("/templatesinfo", TemplateInfoRoute);
app.use("/sendemail", sendEmailRoute);
//End All Routes
app.use((req, res, next) => {
  const error = new Error("not Found in app.js line 46");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;