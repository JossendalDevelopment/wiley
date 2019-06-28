#!/usr/bin/env node
const spawn = require('child_process').spawn;
require('dotenv').config();

const startStream = function() {
    console.log('Starting Stream');
    const VIDSOURCE = `rtsp://${process.env.IP_CAM_USERNAME}:${
        process.env.IP_CAM_PASSWORD
    }@192.168.50.83/cam/realmonitor?channel=1subtype=0`;
    // AUDIO_OPTS="-c:a aac -b:a 160000 -ac 2"
    const VIDEO_OPTS =
        '-fflags nobuffer -s 960x540 -c:v libx264 -b:v 640000 -bufsize 768k -maxrate 800k -preset veryfast -tune zerolatency';
    const OUTPUT_HLS =
        '-hls_time 10 -hls_list_size 4 -start_number 1 -hls_flags delete_segments';
    // ffmpeg -i "$VIDSOURCE" -y $AUDIO_OPTS $VIDEO_OPTS $OUTPUT_HLS mystream.m3u8

    let proc = spawn('ffmpeg', [
        '-i',
        `rtsp://${process.env.IP_CAM_USERNAME}:${
            process.env.IP_CAM_PASSWORD
        }@192.168.50.83/cam/realmonitor?channel=1subtype=0`,
        '-re',
        '-fflags',
        'nobuffer',
        '-s',
        '960x540',
        '-c:v',
        'libx264',
        '-b:v',
        '640000',
        '-bufsize',
        '768k',
        '-maxrate',
        '800k',
        '-preset',
        'ultrafast',
        '-tune',
        'zerolatency',
        '-y',
        '-hls_time',
        '10',
        '-hls_list_size',
        '4',
        '-start_number',
        '1',
        '-hls_flags',
        'delete_segments',
        `mystream.m3u8`,
    ]);
    proc.stdout.on('data', function(data) {
        console.log(data);
    });

    proc.stderr.on('data', function(data) {
        console.log(data);
    });

    proc.on('exit', function() {
        console.log('finished');
    });
};

startStream();
