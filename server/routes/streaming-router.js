const express = require('express');
const exec = require('child_process').exec;
// const path = require('path');
// const fs = require('fs');
// const formatResponse = require('../helpers/format-response.js');
// const Stream = require('node-rtsp-stream');
var cors = require('cors');

var router = express.Router();

const corsOptions = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

router.get('/start_video_stream', cors(corsOptions), (req, res) => {
    console.log('Creating Stream', `${__dirname}/../../public/live`);
    exec(
        './testing.sh rtsp://admin:jossendal0579@192.168.50.83/cam/realmonitor?channel=1subtype=0 streams',
        { cwd: `${__dirname}/../public/live` },
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    );
    // const stream = new Stream({
    //     name: 'name',
    //     // streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
    //     // streamUrl: 'rtsp://192.168.50.83/cam/realmonitor?channel=1subtype=0',
    //     streamUrl:
    //         'rtsp://admin:jossendal0579@192.168.50.83/cam/realmonitor?channel=1subtype=0',
    //     wsPort: 9999,
    //     ffmpegOptions: {
    //         // options ffmpeg flags
    //         '-s': '900x640',
    //         '-stats': '', // an option with no neccessary value uses a blank string
    //         '-r': 30, // options with required values specify the value after the key
    //     },
    // });

    // fs.createReadStream(
    //     path.resolve(__dirname + '/../public/live/mystream.m3u8')
    // ).pipe(res);
    // res.sendFile(path.resolve(__dirname + '/../public/live/mystream.m3u8'));
    res.status(200).json({ msg: 'RSTP stream running in background' });
});

module.exports = router;
