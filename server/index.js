const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
// const ejwt = require('express-jwt');
// const config = require('config');

const PORT = process.env.PORT || 3001;

// firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://wiley-app.firebaseio.com',
});

// routers
const publicRouter = require('./routes/public-router');
const authenticatedRouter = require('./routes/authenticated-router');
const streamingRouter = require('./routes/streaming-router');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', publicRouter);
app.use('/api', authenticatedRouter);
app.use('/stream', streamingRouter);
// app.use('/api', ejwt({secret: config.get('jwt-secret')}), authenticatedRouter);

const server = app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// FOR DOCKER: place this code in your node app, ideally in index.js or ./bin/www
//
// you need this code so node will watch for exit signals
// node by default doesn't handle SIGINT/SIGTERM
// docker containers use SIGINT and SIGTERM to properly exit
//
// signals also aren't handeled by npm:
// https://github.com/npm/npm/issues/4603
// https://github.com/npm/npm/pull/10868
// https://github.com/RisingStack/kubernetes-graceful-shutdown-example/blob/master/src/index.js
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's
// a graceful shutdown of node process, just a forced exit
//

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info(
        'Got SIGINT (aka ctrl-c in docker). Graceful shutdown ',
        new Date().toISOString()
    );
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info(
        'Got SIGTERM (docker container stop). Graceful shutdown ',
        new Date().toISOString()
    );
    shutdown();
});

// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit();
    });
}

module.exports = app;
