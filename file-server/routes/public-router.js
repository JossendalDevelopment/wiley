const express = require('express');
const fs = require('fs');
const path = require('path');
const conf = require('../config/production');

const router = express.Router();

const createReadDirPaths = (less = 1) => {
    // create filepath from yesterdays date
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - less) // -1 because we want yesterdays images
    // const year = yesterday.getFullYear();
    // let month = yesterday.getMonth() + 1; // months are zero indexed
    // month = month.toString().padStart(2, '0');
    let day = yesterday.getDate().toString().padStart(2, '0');
    console.log("DAY", day)

    // hardcoded for dev
    return [`${conf.image_filepath_east}/2019/07/24/unverified`, `${conf.image_filepath_west}/2019/07/24/unverified`]
    // return [`${conf.image_filepath_east}/${year}/${month}/${day}/unverified/`, `${conf.image_filepath_west}/${year}/${month}/${day}/unverified/`]
};

const createWriteJsonPath = (eventData) => {
    // create filepath from provided events data
    return `${eventData.image_filepath}/verified/${eventData.id}.json`;
};

const createDeletePath = (eventData) => {
    // create filepath to delete from provided events data
    return `${eventData.image_filepath}/unverified/${eventData.id}.json`;
};

// const createWriteThumbPath = (eventData) => {
//     // create filepath from provided events data
//     return `${eventData.thumb_filepath}/thumbnails/${eventData.thumb_filename}`;
// };

const arrayFromJsonFiles = async (filepath) => {
    // read 25 json files from each camera directory
    return await new Promise((resolve, reject) => {
        console.log("FILEPATH", filepath)
        fs.readdir(filepath, async (err, filenames) => {
            if (err) reject(new Error(err));

            try {
                if (!filenames.length) {
                    resolve([]);
                }

                let promises = [];

                for (let i = 0; i < 25; i++) {
                    filenames[i] && promises.push(readFileContents(filepath, filenames[i]));
                }
                resolve(Promise.all(promises));
            } catch (error) {
                reject(new Error(error));
            }
        });
    }).
        catch(error => {
            console.log('caught in arrayFromJsonFiles', error.message);
            return { status: 500, msg: "No such file or directory" };
        });
};

const readFileContents = async (filepath, file) => {
    // does the actual reading for arrayFromJsonFiles
    return await new Promise((resolve, reject) => {
        fs.readFile(`${filepath}/${file}`, 'utf-8', async (err, content) => {
            err ? reject(new Error(err)) : resolve(JSON.parse(content));
        })
    }).
        catch(error => {
            console.log('caught in readFileContents', error.message);
            return { status: 500, msg: "No such file or directory" };
        });
};

const createNewJsonFile = async (filepath, data) => {
    // write json with updated classification to /verified directory
    const pathname = path.join(__dirname, '../public', filepath);
    console.log("WRITING NEW FILE TO:", pathname);

    // const fileWriteStream = fs.createWriteStream(pathname, {flags: 'w'});
    // fileWriteStream.on('error', (err) => Promise.reject(new Error(err)));

    // for (let i = 0; i < 1e6; i++) {
    //     const ableToWrite = fileWriteStream.write(JSON.stringify(data, null, 1));
    //     if (!ableToWrite) {
    //         return await new Promise(resolve => {
    //             fileWriteStream.once('drain', resolve("file created successfully"));
    //         }).
    //             catch(error => {
    //                 console.log('caught in createNewJsonFile', error.message);
    //                 return { status: 500, msg: "No such file or directory" };
    //             });
    //     }
    // }
    return await new Promise(resolve => {
        fs.writeFile(pathname, JSON.stringify(data), (error) => {
            if (error) {
                console.log('caught in createNewJsonFile', error.message);
                return { status: 500, msg: "File write failed" };
            }
            resolve("file created successfully")

        })
    }).
        catch(error => {
            console.log('caught in createNewJsonFile', error.message);
            return { status: 500, msg: "No such file or directory" };
        });
};

// const pngDataURLToFile = async (filename, data) => {
//     var base64Data = data.thumb_250x250.replace(/^data:image\/png;base64,/, "");

//     return await new Promise((resolve, reject) => {
//         fs.writeFile(filename, base64Data, 'base64', async (err, data) => {
//             err ? reject(new Error(err)) : resolve(JSON.parse(data));
//         })
//     }).
//         catch(error => {
//             console.log('caught in pngDataURLToFile', error.message);
//             return { status: 500, msg: "Unable to create thumbnail" };
//         })
// };

const deleteUnverifiedJson = async (filepath) => {
    // delete unverified json file after it has been classified
    return await new Promise((resolve, reject) => {
        const pathname = path.join(__dirname, '../public', filepath);
        console.log("DELETING FILES AT:", pathname);
        fs.unlink(pathname, (err) => {
            if (err && err.code == 'ENOENT') {
                // dont kill the process if file was not found
                resolve({ status: 200, message: "file does not exist" });
            }
            err ? reject(new Error(err)) : resolve("file deleted successfully");
        });
    }).
        catch(error => {
            console.log('caught in createNewJsonFile', error.message);
            return { status: 500, msg: "No such file or directory" };
        });
};

const formatResponse = (res, type, data) => {
    if (type === "error") {
        res.status(500).json({ message: "error", data });
    } else if (type === "success") {
        res.status(200).json({ message: "success", data });
    }
};

/* *********   ROUTES   **************** */

router.get('/', (req, res) => {
    res.json({ title: 'You Have File server' });
});

router.get('/metadata', async (req, res) => {
    try {
        let dirPaths = createReadDirPaths();
        let cam1 = await arrayFromJsonFiles(dirPaths[0]);
        let cam2 = await arrayFromJsonFiles(dirPaths[1]);
        if (cam1.status === 500 || cam2.status === 500) {
            formatResponse(res, 'error', "COULD NOT LOCATE DATA FOR CAMERA");
        } else {
            console.log("FROM EACH CAMERA", cam1.length, "AND", cam2.length);
            res.json([...cam1, ...cam2]);
        }
    } catch (error) {
        console.error('ERROR IN FILESERVER', error);
        formatResponse(res, 'error', error);
    }
});

router.post('/write_metadata', async (req, res) => {
    try {
        const data = req.body;
        let filepath = createWriteJsonPath(data);
        // let thumbpath = createWriteThumbPath(data);
        // let thumbWriteResult = pngDataURLToFile(thumbpath, data);
        let removalFilepath = createDeletePath(data);
        let writeResult = await createNewJsonFile(filepath, data);
        let deleteResult = await deleteUnverifiedJson(removalFilepath);
        if (
            writeResult.status === 500 ||
            deleteResult.status === 500
            // thumbWriteResult.status === 500
        ) {
            formatResponse(res, 'error', "COULD NOT WRITE TO FILESYSTEM");
        } else {
            formatResponse(res, 'success', "WRITE SUCCESSFUL");
        }
    } catch (error) {
        console.error('ERROR IN FILESERVER', error);
        formatResponse(res, 'error', error);
    }
});

module.exports = router;
