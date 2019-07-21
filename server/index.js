const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
var pgp = require('pg-promise')(/* options */)
// const ejwt = require('express-jwt');
// const config = require('config');

const PORT = process.env.PORT || 3001;

// firebase initialization
const admin = require('firebase-admin');
let serviceAccount;
let db_url;
console.log("PORT:", PORT)
console.log("ENV:", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS_PROD);
    db_url = 'https://wiley-app-rotf.firebaseio.com';
} else {
    serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS_DEV);
    db_url = 'https://wiley-app-rotf-dev.firebaseio.com'
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: db_url,
});

// postgres initialization
var db = pgp(process.env.DB_URL)

const initPostgres = () => {
    // db.one('SELECT $1 AS value', 123)
    db.any('SELECT * FROM test')
        .then((data) => {
            console.log('SUCCESS:', data)
        })
        .catch((error) => {
            console.log('INIT ERROR:', error)
            console.log("RETRYING")
            setTimeout(() => {
                initPostgres()
            }, 3000)
        })
}
initPostgres();

// routers
const publicRouter = require('./routes/public-router');
const authenticatedRouter = require('./routes/authenticated-router');

var app = express();

// request limits here extended to allow for passing base64 data uri when creating thumbnail
// in routes/authenticated-router /update_event route
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this needs to be before use static to serve files and all routes requiring cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/healthcheck', function (req, res) {
    // docker healthcheck - do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.send('I am happy and healthy\n');
});

app.use('/', publicRouter);
app.use('/api', authenticatedRouter);
// app.use('/api', ejwt({secret: config.get('jwt-secret')}), authenticatedRouter);

const server = app.listen(PORT, () => {
    console.log('API Server listening on port ' + PORT);
});

/* ***********************************************************
 ERROR HANDLING
************************************************************* */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// ******************************************************************
// FOR DOCKER NODE CONFIGURATION: place in index.js or ./bin/www
// ******************************************************************
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
