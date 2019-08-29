const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;

const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

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
    // do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.send('I am happy and healthy\n');
});

// routers
const publicRouter = require('./routes/public-router');

app.use('/', publicRouter);

const server = app.listen(PORT, () => {
    console.log('File Server listening on port ' + PORT);
});

let procs = [];
(function init() {
    // ***********************************************************************
    // INITIALIZE FFMPEG READING OF RTSP STREAMS
    // ***********************************************************************
    console.log('Initializing stream with ', process.env);
    if (procs.length !== 0) {
        // we don't want multiple streams being written for same url
        console.log('Killing existing ffmpeg processes and restarting');
        procs[0].kill();
        procs[1].kill();
        procs = [];
        init();
    } else {
        console.log('Creating Stream data in:', `${__dirname}/public/live`);
        let commands = [
            { url: './startstream.sh', args: [process.env.IP_CAM_RTSP_URL_ONE, 'streams/one'] },
            { url: './startstream.sh', args: [process.env.IP_CAM_RTSP_URL_TWO, 'streams/two'] },
            // `./startstream.sh ${process.env.IP_CAM_RTSP_URL_TWO} streams/two`,
            // 'channel=1&subtype=0"',
            // './startstream.sh rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov streams/two',
        ];
        commands.forEach(command => {
            let child = spawn(
                command.url,
                command.args,
                { cwd: `${__dirname}/public/live` }
            );
            child.on('exit', () => {
                console.log('process exit');
                console.log("*******RESTARTING*******")
                // init();
            });
            child.stdout.on('data', (data) => {
                console.log('STDOUT Output: ' + data.toString('utf8'));
            });
            child.stderr.on('data', () => {
                // console.log('STDERR Output: ' + error);
                // init();
            });
            child.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`);
            });
            procs.push(
                child
            );
        });
    }

    process.on('uncaughtException', (err) => {
        console.log('Caught exception in fileserver: ', err);
        init();
    });
})();

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
