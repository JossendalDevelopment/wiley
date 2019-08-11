const express = require('express');
const db = require('../config/conn');
const Event = require('../types/Event');
// const config = require('config');
// const formatResponse = require('../helpers/format-response.js');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ title: 'Yep your server is running' });
});

router.post('/trigger_alarm', (req, res) => {
    const data = req.body
    console.log("TRIGGER", Object.values(new Event(data)));
    req.io.sockets.emit('TRIGGER_ALARM', data);

    db.one('INSERT INTO alerts(bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING id', Object.values(new Event(data)))
        .then(resp => {
            console.log("ALARM DATA INSERTED SUCCESSFULLY", resp.id); // print new user id;
            res.status(200).json({ msg: "Alarm triggered successfully" })
        })
        .catch(error => {
            console.log('ERROR:', error); // print error;
        })
});

// router.post('/login', (req, res) => {
// const token = jwt.sign({employeeEmail: req.body.employeeEmail}, config.get('jwt-secret'))
// admin.auth().createUser({
//     email: req.body.employeeEmail,
//     emailVerified: true,
//     // phoneNumber: '123-456-7890',
//     password: req.body.password,
//     displayName: 'Test',
//     // photoURL: '',
//     disabled: false
// })
// .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log('Successfully created new user:', userRecord);
//     formatResponse(res, 'success', { token: userRecord });
// })
// .catch(function(error) {
//     console.log('Error creating new user:', error);
// });
// formatResponse(res, 'success', { token: token });

// });

module.exports = router;
