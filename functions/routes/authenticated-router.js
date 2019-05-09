const express = require('express');
const formatResponse = require('../helpers/format-response.js');
const admin = require('firebase-admin');

var router = express.Router();

const db = admin.firestore();

router.get('/authenticated', (req, res) => {
    res.json({ title: 'Please visit jossendal.com today' });
})

router.post('/create_event', (req, res) => {
    console.log("BODY", req.body.event)
    const event = req.body.event;
    db.collection('event_log').add(event)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    formatResponse(res, 'success', {});
});


module.exports = router;