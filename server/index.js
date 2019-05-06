const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const request = require('request');

const publicRouter = require('./routes/public-router.js');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', publicRouter)
// app.use('/api', ejwt({secret: config.get('jwt-secret')}), privateRouter)

app.listen(3001, () => {
    console.log("Server listening on port 3001")
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
