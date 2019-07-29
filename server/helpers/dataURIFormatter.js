const fs = require('fs');

const dataURLtoFile = (dataurl, filename) => {
    var base64Data = dataurl.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(filename, base64Data, 'base64',
        (err, data) => {
            if (err) {
                console.log('err', err);
            }
            console.log('success', data);

        });
};

module.exports = dataURLtoFile;