const express = require('express');
const db = require('../config/conn');
const Event = require('../types/Event');
const formatResponse = require('../helpers/format-response.js');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ title: 'Yep your server is running' });
});

router.post('/trigger_alarm', (req, res) => {
    const data = req.body
    data.modified_date = new Date().toISOString();

    req.io.sockets.emit('TRIGGER_ALARM', data);

    db.one('INSERT INTO alerts(bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_filename) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING id', Object.values(new Event(data)))
        .then(resp => {
            formatResponse(res, 'success', resp);
        })
        .catch(error => {
            console.log('ERROR IN TRIGGER_ALARM:', error); // print error;
            formatResponse(res, 'error', error);
        })
});

module.exports = router;
