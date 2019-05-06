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

// app.get('/nest', cors(), (req, res) => {
//     console.log("HIT API")
//     var token = "c.Nz7bNdrH7ufmYC281BFtoUQQBBseHTDZ7uwbTCDzvXwakNsDzS8JcuBMB8yclwwVYx8T9Nq6nSXYoOQqON5bHpPEkwC9jUoC7ZvLEogbwhSZ0srisIpcUh3rJegnR4B2byPmZUMYAM9JMcdM"; // Update with your token

//     var url = "https://developer-api.nest.com";

//     var options = {
//         "method": "GET",
//         "path": "/",
//         "headers": {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + token
//         },
//         // "followRedirect": true
//     };

//     request(url, options, (err, resp, data) => {
//         console.log('response code: ' + resp.statusCode);
//         if (err) {
//             console.log('Error: ' + err.message);
//         }
//         return res.json(data);
//     });

//     // console.log("APIREQUEST", apiRequest)
//     // apiRequest.end();
// })


app.listen(3001, () => {
    console.log("Server listening on port 3001")
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
