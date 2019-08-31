const http = require('http');
const Event = require('../types/Event');

const writeMetadataFile = newEvent =>
    new Promise((resolve, reject) => {
        // strip out thumb datauri if it exists
        let trimmedEventData = new Event(newEvent)
        delete trimmedEventData.thumb_250x250;

        const postData = JSON.stringify(trimmedEventData);

        const post_options = {
            host: process.env.FILESERVER_BASE_URL || 'localhost', // change this from localhost on dev to fileserver(container name) in prod
            port: '3000',
            path: '/write_metadata',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            },
        };

        const post_req = http.request(post_options, (res) => {
            // uncomment below to get back json in utf8
            // res.setEncoding('utf8');

            // otherwise we get back binary
            if (res.statusCode < 200 || res.statusCode >= 300) {
                reject(new Error({ status: res.statusCode, message: 'Could not connect to filserver for writing' }));
            }

            res.on('data', data => {
                resolve(JSON.parse(data));
            });

        });
        post_req.on('error', error => {
            console.error('ERROR IN WRITE REQUEST:', error);
            reject(new Error({ status: 500, message: error }));
        });
        post_req.write(postData);
        post_req.end();
    });

module.exports = { writeMetadataFile };
