const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cron = require('node-cron');
require('dotenv').config();
// const ejwt = require('express-jwt');
// const config = require('config');
const db = require('./config/conn.js')

const PORT = process.env.PORT || 3001;

console.log("ENV:", process.env.NODE_ENV)


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// request limits here extended to allow for passing base64 data uri when creating thumbnail
// in routes/authenticated-router /update_event route
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this needs to be before app.use static to serve files and all routes requiring cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

/* ***********************************************************
 CHRON JOB
************************************************************* */

// Every day at midnight we want to clear alerts that were not classified
// as there will be thousands a day initially

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

let sched = '0 0 0 * * *';
cron.schedule(sched, async () => {
    console.log('TASK: running chron job at midnight... Clearing "alerts" from database...');
    try {
        await db.none('TRUNCATE alerts; DELETE FROM alerts;');
    } catch (error) {
        console.error("ERROR RUNNING CHRON:", error);
    }
});

/* ***********************************************************
 SOCKET IO
************************************************************* */
io.on('connection', function (socket) {
    console.log('SOCKET.IO CONNECTED', socket.id);
});

io.on('disconnect', (socket) => {
    console.log("SOCKET.IO DISCONNECTING", socket.id)
    socket.removeAllListeners();
})
// Make io accessible to our router
app.use((req, res, next) => {
    req.io = io;
    next();
});

/* ***********************************************************
  POSTGRES CONNECTION TEST
************************************************************* */

let retries = 50;
const testPostgres = () => {
    // db.one('SELECT $1 AS value', 123)
    db.any('SELECT * FROM test')
        .then((data) => {
            console.log('DB INIT SUCCESS:', data)
        })
        .catch((error) => {
            console.log('DB INIT ERROR:', error)
            console.log("RETRIES LEFT...", retries)
            if (retries === 0) return;
            setTimeout(() => {
                testPostgres();
                retries--;
            }, 50000 / retries)
        })
}
testPostgres();

/* ***********************************************************
  DOCKER CONTAINER HEALTHCHECK ROUTE
************************************************************* */

app.get('/healthcheck', function (req, res) {
    // docker healthcheck - do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.send('I am happy and healthy\n');
});

/* ***********************************************************
  ROUTERS
************************************************************* */

const publicRouter = require('./routes/public-router');
const authenticatedRouter = require('./routes/authenticated-router');
app.use('/', publicRouter);
app.use('/api', authenticatedRouter);
// app.use('/api', ejwt({secret: config.get('jwt-secret')}), authenticatedRouter);

// start server
server.listen(PORT, () => {
    console.log('API Server listening on port ' + PORT);
});


/* ***********************************************************
 ERROR HANDLING
************************************************************* */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

/* ******************************************************************
// FOR DOCKER NODE CONFIGURATION: place in index.js or ./bin/www
***************************************************************** */

// you need this code so node will watch for exit signals
// node by default doesn't handle SIGINT/SIGTERM
// docker containers use SIGINT and SIGTERM to properly exit

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
