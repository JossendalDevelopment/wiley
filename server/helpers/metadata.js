const http = require('http');
const Event = require('../types/Event');

const getMetadataFile = () => {
    return new Promise((resolve, reject) => {
        console.log("FILESERVER_BASE_URL:", process.env.FILESERVER_BASE_URL)
        const get_options = {
            host: process.env.FILESERVER_BASE_URL || 'localhost', // change this from localhost on dev to fileserver(container name) in prod
            port: '3000',
            path: '/metadata',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const get_req = http.request(get_options, res => {
            // uncomment below to get back json in utf8
            // res.setEncoding('utf8');

            // otherwise we get back binary

            if (res.statusCode < 200 || res.statusCode >= 300) {
                // First reject
                return reject(new Error('Get metadata file request failed on connection'));
            }

            var body = [];
            res.on('data', chunk => {
                // in case json file is huge, parse it in chunks
                body.push(chunk);
            });

            res.on('end', function () {
                try {
                    // then create nice looking json from body
                    body = JSON.parse(Buffer.concat(body).toString());
                    // resolve load all events into the database
                    resolve(body);
                } catch (error) {
                    console.error("ERROR PARSING JSON:", error)
                    return reject(new Error('Get metadata file request failed on parsing of buffer'));
                }
            });
        });
        get_req.end();
        get_req.on('error', error => {
            console.error('ERROR GETTING YESTERDAYS EVENTS:', error);
            return reject(new Error('Get metadata file request failed'));
        });
    });
};

// Writing to this file is probably not needed anymore
const writeMetadataFile = newEvent =>
    new Promise((resolve, reject) => {
        // strip out thumb datauri
        let trimmedEventData = new Event(newEvent)
        delete trimmedEventData.thumb_250x250;

        const postData = JSON.stringify(trimmedEventData)

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
                // First reject
                reject(new Error({ status: res.statusCode, message: 'Could not connect to filserver for writing' }));
            }

            res.on('data', data => {
                resolve(JSON.parse(data));
            });

        });
        post_req.on('error', error => {
            console.error('ERROR IN WRITE REQUEST:');
            reject(new Error({ status: 500, message: error }));
        });
        post_req.write(postData)
        post_req.end();
    });

module.exports = { getMetadataFile, writeMetadataFile };
