// this will set the path of where the api server will look in the 
// fileserver to find the correct metadata.json file/s
// RESULTING PATH: <image_filepath>/<YEAR>/<MONTH>/<DAY>/metadata.json
module.exports = {
    // used in server/metaDataFile.js
    image_host: 'localhost',
    image_filepath_east: 'public/mnt/sol2_video/east-inferenced/raw',
    image_filepath_west: 'public/mnt/sol2_video/west-inferenced/raw',
    port: 3000,
};
