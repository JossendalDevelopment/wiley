const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const PORT = process.env.PORT || 3000;

// routers
const publicRouter = require('./routes/public-router');

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

app.use('/file', publicRouter);

const server = app.listen(PORT, () => {
    console.log('File Server listening on port ' + PORT);
});

(function init() {
    // ***********************************************************************
    // INITIALIZE FFMPEG READING OF RTSP STREAMS
    // ***********************************************************************
    console.log('Initializing stream with ', process.env);
    let procs = [];
    if (procs.length !== 0) {
        console.log('Killing existing ffmpeg processes', procs);
        procs[0].kill();
        procs[1].kill();
    } else {
        console.log('Creating Stream data in:', `${__dirname}/public/live`);
        let commands = [
            // `./startstream.sh ${process.env.IP_CAM_RTSP_URL_ONE} streams/one`,
            // `./startstream.sh ${process.env.IP_CAM_RTSP_URL_TWO} streams/two`,
            './startstream.sh rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov streams/one',
            './startstream.sh rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov streams/two',
        ];
        commands.forEach(command => {
            procs.push(
                exec(
                    command,
                    { cwd: `${__dirname}/public/live` },
                    (error, stdout, stderr) => {
                        console.log(stdout);
                        console.log(stderr);
                        if (error !== null) {
                            console.log(`exec error: ${error}`);
                        }
                    }
                )
            );
        });
    }
    process.on('exit', function() {
        console.log('Terminating streaming processes on exit');
        procs.forEach(p => p.kill());
    });
})();

/* ***********************************************************
 ERROR HANDLING
************************************************************* */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
