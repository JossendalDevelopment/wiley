const express = require('express');
const fs = require('fs');
const path = require('path');
const conf = require('../config/production');

const router = express.Router();

const createReadDirPaths = () => {
    // create filepath from yesterdays date
    const today = new Date();
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1) // -1 because we want yesterdays images
    const year = yesterday.getFullYear();
    let month = yesterday.getMonth() + 1; // months are zero indexed
    month = month.toString().padStart(2, '0');
    let day = yesterday.getDate().toString().padStart(2, '0');

    // hardcoded for dev
    // return [`${conf.image_filepath_east}/2019/07/23/unverified`, `${conf.image_filepath_west}/2019/07/23/unverified`]
    return [`${conf.image_filepath_east}/${year}/${month}/${day}/unverified/`, `${conf.image_filepath_west}/${year}/${month}/${day}/unverified/`]
};

const createWritePath = (eventData) => {
    // create filepath from provided events data
    return `${eventData.image_filepath}/verified/${eventData.id}.json`
};

const createDeletePath = (eventData) => {
    // create filepath to delete from provided events data
    return `${eventData.image_filepath}/unverified/${eventData.id}.json`
};

const arrayFromJsonFiles = async (filepath) => {
    // read 25 json files from each camera directory
    return await new Promise((resolve, reject) => {
        console.log("FILEPATH", filepath)
        fs.readdir(filepath, async (err, filenames) => {
            let promises = []
            if (err) reject(new Error(err))
            try {
                for (let i = 0; i < 25; i++) {
                    filenames[i] && promises.push(readFileContents(filepath, filenames[i]))
                }
                resolve(Promise.all(promises))
            } catch (error) {
                reject(new Error(error))
            }
        });
    });
};

const readFileContents = async (filepath, file) => {
    // does the actual reading for arrayFromJsonFiles
    return await new Promise((resolve, reject) => {
        fs.readFile(`${filepath}/${file}`, 'utf-8', async (err, content) => {
            err ? reject(new Error({ status: 500, message: err })) : resolve(JSON.parse(content));
        })
    })
};

const createNewJsonFile = async (filepath, data) => {
    // write json with updated classification to /verified directory
    const pathname = path.join(__dirname, '../public', filepath);
    console.log("DELETING FILES AT:", pathname)
    const fileWriteStream = fs.createWriteStream(pathname);
    fileWriteStream.on('error', (err) => Promise.reject(new Error({ status: 500, message: err })))

    for (let i = 0; i < 1e6; i++) {
        const ableToWrite = fileWriteStream.write(JSON.stringify(data, null, 1));
        if (!ableToWrite) {
            return await new Promise(resolve => {
                fileWriteStream.once('drain', resolve({ status: 200, message: "file created successfully" }));
            });
        }
    }
};

const deleteUnverifiedJson = async (filepath) => {
    // delete unverified json file after it has been classified
    return await new Promise((resolve, reject) => {
        const pathname = path.join(__dirname, '../public', filepath);
        console.log("DELETING FILES AT:", pathname)
        fs.unlink(pathname, (err) => {
            if (err && err.code == 'ENOENT') {
                resolve({ status: 200, message: "file does not exist" })
            }
            err ? reject(new Error({ status: 500, message: err })) : resolve({ status: 200, message: "file deleted successfully" })
        });
    });
};

/* *********   ROUTES   **************** */

router.get('/', (req, res) => {
    res.json({ title: 'You Have File server' });
});

router.get('/metadata', async (req, res) => {
    let dirPaths = createReadDirPaths();
    let cam1 = await arrayFromJsonFiles(dirPaths[0]);
    let cam2 = await arrayFromJsonFiles(dirPaths[1]);
    res.json(cam1.concat(cam2));
});

router.post('/write_metadata', async (req, res) => {
    const data = req.body;
    let filepath = createWritePath(data);
    let removalFilepath = createDeletePath(data);
    let writeResult = await createNewJsonFile(filepath, data);
    let deleteResult = await deleteUnverifiedJson(removalFilepath);
    if (writeResult.status === 200 && deleteResult.status === 200) {
        res.json({ status: 200 });
    } else {
        res.json({ status: 500 });
    }
});

module.exports = router;
