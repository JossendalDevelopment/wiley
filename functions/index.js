const functions = require('firebase-functions');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// module.exports = app;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.app = functions.https.onRequest(app)
