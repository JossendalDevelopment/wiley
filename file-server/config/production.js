// this will set the path of where the api server will look in the 
// fileserver to find the correct metadata.json file/s
// RESULTING PATH: <image_filepath>/<YEAR>/<MONTH>/<DAY>/metadata.json
module.exports = {
    // used in server/metaDataFile.js
    image_host: 'localhost',
    image_filepath: 'public/mnt/sol2_video/east-inferenced/raw',
    port: 3000,
};
