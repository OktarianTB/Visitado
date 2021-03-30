const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Setup environment variables
dotenv.config({path: "./server/config/.env"})

// Setup App
const app = express();

// Setup Cors
app.use(cors());

// Setup Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Setup Routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json({
    status: "fail",
    message: err.message
  })
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
}

// Start App
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
