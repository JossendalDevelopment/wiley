const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const request = require('request');
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

// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'))
// })

app.use('/api', publicRouter)
// app.use('/api', ejwt({secret: config.get('jwt-secret')}), privateRouter)

// handle production environment
if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV, path.join(__dirname, 'public/'))
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    })

}

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
