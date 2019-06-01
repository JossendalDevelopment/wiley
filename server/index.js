const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const ejwt = require('express-jwt');
// const config = require('config');

const PORT = process.env.PORT || 3001;

// firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wiley-app.firebaseio.com"
});

// routers
const publicRouter = require('./routes/public-router');
const authenticatedRouter = require('./routes/authenticated-router');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', publicRouter);
app.use('/api', authenticatedRouter);
// app.use('/api', ejwt({secret: config.get('jwt-secret')}), authenticatedRouter);

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;
