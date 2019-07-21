// this will set the path of where the api server will look in the 
// fileserver to find the correct metadata.json file
// RESULT PATH: /mnt/sol2_video/inferenced/<YEAR>/<MONTH>/<DAY>/metadata.json
module.exports = {
    // used in server/metaDataFile.js
    image_host: 'localhost',
    image_filepath: '/mnt/sol2_video/inferenced/',
    port: 3000,
};
