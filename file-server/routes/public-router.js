const express = require('express');
const fs = require('fs');
const conf = require('../config/production');

const router = express.Router();

const createFilePath = () => {
    // create filepath from yesterdays date
    const today = new Date();
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1) // -1 because we want yesterdays images
    const year = yesterday.getFullYear();
    let month = yesterday.getMonth() + 1; // months are zero indexed
    month = month.toString().padStart(2, '0');
    let day = yesterday.getDate().toString().padStart(2, '0');

    // hardcoded for dev
    // return `${conf.image_filepath}/2019/07/21/unverified`;
    return `${conf.image_filepath}/${year}/${month}/${day}/unverified/`;
};

const arrayFromJsonFiles = async (filepath) => {
    return await new Promise((resolve, reject) => {
        fs.readdir(filepath, async (err, filenames) => {
            err ? reject(err) : resolve(Promise.all(filenames.map(f => parseFileContents(filepath, f))));
        });
    });
};

const parseFileContents = async (filepath, file) => {
    return await new Promise((resolve, reject) => {
        fs.readFile(`${filepath}/${file}`, 'utf-8', async (err, content) => {
            err ? reject(err) : resolve(JSON.parse(content));
        })
    })
};

/* *********   ROUTES   **************** */

router.get('/', (req, res) => {
    res.json({ title: 'File server' });
});

router.get('/metadata', async (req, res) => {
    let filepath = createFilePath()
    let result = await arrayFromJsonFiles(filepath);
    res.json(result)
});

module.exports = router;
