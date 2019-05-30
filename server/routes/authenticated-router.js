const express = require('express');
const formatResponse = require('../helpers/format-response.js');
const admin = require('firebase-admin');

var router = express.Router();

const db = admin.firestore();

router.get('/authenticated', (req, res) => {
    res.json({ title: 'Please visit jossendal.com today' });
});

router.post('/create_event', (req, res) => {
    const event = req.body.event;
    db.collection('classified_events').add(event)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            db.collection('classified_events').doc(docRef.id).update({
                eventId: docRef.id,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            })
            formatResponse(res, 'success', docRef.id);
        })
        .catch((error) => {
            formatResponse(res, 'error', error);
        });
});

router.post('/update_event', (req, res) => {
    console.log("BODY", req.body)
    const event = req.body.event;
    db.collection('classified_events').doc(event.eventId).update({
        classifiedAs: event.classifiedAs,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        classified: true
    })
    .then(docRef => {
        console.log("NEW DOC", docRef)
        formatResponse(res, 'success', event.id);

    })
});

router.get('/get_all_events', (req, res) => {
    let result = [];
    db.collection("classified_events").get().then(
        (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                let newDoc = doc.data();
                newDoc.id = doc.id;
                result.push(newDoc)
            });
            formatResponse(res, 'success', result);
        },
        (error) => {
            formatResponse(res, 'error', error);
        }
    );
});

router.get('/get_all_classified_events', (req, res) => {
    let result = [];
    db.collection("classified_events").where("classified", "==", true).get().then(
        (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let newDoc = doc.data();
                newDoc.id = doc.id;
                result.push(newDoc)
            });
            formatResponse(res, 'success', result);
        },
        (error) => {
            formatResponse(res, 'error', error);
        }
    );
});

router.post('/set_new_events', (req, res) => {
    const events = req.body.events;
    events.forEach(event => {
        db.collection('classified_events').add(event)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                db.collection('classified_events').doc(docRef.id).update({
                    eventId: docRef.id,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                })
                formatResponse(res, 'success', docRef.id);
            })
            .catch((error) => {
                formatResponse(res, 'error', error);
            });
    })
});

module.exports = router;