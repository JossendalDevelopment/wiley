const createError = require('http-errors');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;

var app = express();

// serve static from dist for heroku
app.use(express.static(path.join(__dirname, 'dist')));


app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
