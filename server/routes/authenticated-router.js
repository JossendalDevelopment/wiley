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

router.get('/get_all_events', (req, res) => {
    let result = [];
    // db.collection("event_log").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //         let newDoc = doc.data();
    //         newDoc.id = doc.id;
    //         result.push(newDoc)
    //     });
    //     formatResponse(res, 'success', result)
    // });
    db.collection("event_log")
        .onSnapshot(
            querySnapshot => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                    let newDoc = doc.data();
                    newDoc.id = doc.id;
                    result.push(newDoc)
                });
            formatResponse(res, 'success', result)
            },
            (error) => {
                formatResponse(res, 'error', error)
            }
        )
})


module.exports = router;