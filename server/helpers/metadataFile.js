const http = require('http');
const conf = require('../config/production')
// const fs = require('fs');

// TODO potential issue of someone trying to write to the json file from the wrong day

const createFilePath = () => {
    // create filepath from yesterdays date
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // months are zero indexed
    month = month.toString().padStart(2, '0');
    const day = date
        .getUTCDate() // TODO -1 because we want yesterdays images, foregoing this for ease of testing for now
        .toString()
        .padStart(2, '0');
    return `${conf.image_filepath}${year}/${month}/${day}/metadata.json`;
};

const getMetadataFile = () =>
    new Promise((resolve, reject) => {
        const metaFilePath = createFilePath();
        console.log("METADATA FILE PATH:", metaFilePath)

        const get_options = {
            host: process.env.FILESERVER_BASE_URL || 'localhost', // change this from localhost on dev to fileserver(container name) in prod
            port: '3000',
            path: metaFilePath,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const get_req = http.request(get_options, res => {
            // get back json in utf8
            // res.setEncoding('utf8');
            // otherwise we get back binary

            if (res.statusCode < 200 || res.statusCode >= 300) {
                // First reject
                reject('statusCode:', res.statusCode);
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
                } catch (e) {
                    reject(e);
                }
            });
        });
        get_req.end();
        get_req.on('error', error => {
            console.error('ERROR GETTING YESTERDAYS EVENTS:', error);
            reject(error);
        });
    });

// Writing to this file is probably not needed anymore
const writeMetadataFile = newEvent =>
    new Promise((resolve, reject) => {
        getMetadataFile()
            .then(eventsJson => {
                console.log('Found Events for writing', eventsJson);
                const events = eventsJson
                    .filter(event => event.id != newEvent.id)
                    .concat(newEvent);
                // write to json file here
                // http post request to file server
                // fs.writeFile(createFilePath(), events, err => {
                //     if (err) {
                //         return console.log('Error writing file: ' + err);
                //     }
                // });
                resolve(events);
            })
            .catch(error => {
                reject('Error writing to MetaData file', error);
            });
    });

module.exports = { getMetadataFile, writeMetadataFile };
