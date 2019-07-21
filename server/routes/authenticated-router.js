const express = require('express');
const admin = require('firebase-admin');
const formatResponse = require('../helpers/format-response.js');
const postgres = require('../config/conn');
const {
    getMetadataFile,
    // writeMetadataFile,
} = require('../helpers/metadataFile.js');

var router = express.Router();

const db = admin.firestore();
const COLLECTION_REF = db.collection('classified_events');

router.get('/authenticated', (req, res) => {
    res.json({ title: 'You have authenticated access' });
});

// unused. revisit on sprint 2 when events are received via live events
router.post('/create_event', (req, res) => {
    // TODO run this as a batch command
    const event = req.body.event;
    COLLECTION_REF.add(event)
        .then(docRef => {
            COLLECTION_REF.doc(docRef.id).update({
                eventId: docRef.id,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
            formatResponse(res, 'success', docRef.id);
        })
        .catch(error => {
            formatResponse(res, 'error', error);
        });
});

// @METHOD: POST
// @PARAMS: new event object
// @RETURNS: id string
router.post('/update_event', async (req, res) => {
    const event = req.body.event;
    try {
        // this will return a json object of all events fom metadata.json file
        // const newEvents = await writeMetadataFile(event);
        // console.log('NEW EVENTS', newEvents);
        // find EVENT in EVENTSJSON, replace it, and write it to writeMetadataFile()
        COLLECTION_REF.doc(event.eventId)
            .update({
                user_classification: event.user_classification,
                classification_description: event.classification_description,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                thumb_250x250: event.thumb_250x250,
                classified_by: event.classified_by,
            })
            .then(() => {
                return formatResponse(res, 'success', event.id);
            })
            .catch(error => {
                return formatResponse(res, 'error', error);
            });
    } catch (error) {
        console.log('ERROR', error);
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: array of all events
router.get('/get_all_events', (req, res) => {
    let result = [];
    COLLECTION_REF.get()
        .then(
            querySnapshot => {
                querySnapshot.forEach(doc => {
                    let newDoc = doc.data();
                    newDoc.id = doc.id;
                    result.push(newDoc);
                });
                formatResponse(res, 'success', result);
            },
            error => {
                formatResponse(res, 'error', error);
            }
        )
        .catch(error => {
            formatResponse(res, 'error', error);
        });
});

// @METHOD: GET
// @RETURNS: array of all events
router.get('/get_all_events_postgres', (req, res) => {
    postgres.any('SELECT * FROM events')
        .then((data) => {
            console.log("SUCCESS", data)
            formatResponse(res, 'success', data);
        })
        .catch((error) => {
            console.log("ERROR", error)
            formatResponse(res, 'error', error);
        });
    // COLLECTION_REF.get()
    //     .then(
    //         querySnapshot => {
    //             querySnapshot.forEach(doc => {
    //                 let newDoc = doc.data();
    //                 newDoc.id = doc.id;
    //                 result.push(newDoc);
    //             });
    //             formatResponse(res, 'success', result);
    //         },
    //         error => {
    //             formatResponse(res, 'error', error);
    //         }
    //     )
    //     .catch(error => {
    //         formatResponse(res, 'error', error);
    //     });
});

// @METHOD: GET
// @RETURNS: array of all events events with non null user_classificaiton field
router.get('/get_all_classified_events', (req, res) => {
    console.log("USING PORT", process.env.PORT)
    let result = [];
    COLLECTION_REF.where('user_classification', '>', '')
        .get()
        .then(
            querySnapshot => {
                querySnapshot.forEach(doc => {
                    let newDoc = doc.data();
                    newDoc.id = doc.id;
                    result.push(newDoc);
                });
                formatResponse(res, 'success', result);
            },
            error => {
                formatResponse(res, 'error', error);
            }
        )
        .catch(error => {
            formatResponse(res, 'error', error);
        });
});

// @METHOD: GET
// @RETURNS: json array object
// pulls metadata.json file for given day, loads it into firestore, and returns that json to client
router.get('/set_yesterdays_events', async (req, res) => {
    console.log("WRONG ONE")
    try {
        // this will return a json object of all events fom metadata.json file
        const eventsJson = await getMetadataFile();
        // load all events into the database
        eventsJson.forEach(event => {
            let batch = db.batch();
            let newEventRef = COLLECTION_REF.doc();
            batch.set(newEventRef, event);
            batch.update(newEventRef, { eventId: newEventRef.id });
            batch
                .commit()
                .then(() => {
                    // the response object of a batch is batch data. Maybe validate batches or something?
                })
                .catch(error => {
                    throw new Error(error);
                });
        });
        res.json(eventsJson);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: json array object
// pulls metadata.json file for given day, loads it into firestore, and returns that json to client
router.get('/set_yesterdays_events_postgres', async (req, res) => {
    try {
        // this will return a json object of all events fom metadata.json file
        const eventsJson = await getMetadataFile();
        console.log("FROM JSON", eventsJson)
        postgres.tx(t => {
            const queries = eventsJson.map(event => {
                return t.none('INSERT INTO events(id, event_id, image_filepath, image_filename, image_width, image_height, bbox_xmin, bbox_ymin, bbox_width, bbox_height, camera, inferenced_classification, inferenced_percentage, user_classification, classification_description, classified_by, modified_date, thumb_250x250) VALUES(${id}, ${event_id}, ${image_filepath}, ${image_filename}, ${image_width}, ${image_height}, ${bbox_xmin}, ${bbox_ymin}, ${bbox_width}, ${bbox_height}, ${camera}, ${inferenced_classification}, ${inferenced_percentage}, ${user_classification}, ${classification_description}, ${classified_by}, ${modified_date}, ${thumb_250x250})', event);
            });
            return t.batch(queries);
        })
            .then(data => {
                console.log("SUCCESS", data)
                res.json(eventsJson);
            })
            .catch(error => {
                console.error("ERROR:", error)
                res.json([]);
            });

    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: DELETE
// @RETURNS: object of batch deletion data
router.post('/delete_events', (req, res) => {
    // helper to clear firestore as a collection cannot be deleted wholesale. each document must be deleted indiviually
    // This will batch deletions. Only used to support resetting data for demo use
    // OTHERWISE VERY DANGEROUS!!!!!!!!!!!!!!!
    const deleteCollection = batchSize => {
        let query = COLLECTION_REF.limit(batchSize);
        return new Promise((resolve, reject) => {
            deleteQueryBatch(query, batchSize, resolve, reject);
        });
    };

    const deleteQueryBatch = (query, batchSize, resolve, reject) => {
        query
            .get()
            .then(snapshot => {
                // When there are no documents left, we are done
                if (snapshot.size == 0) {
                    formatResponse(res, 'success', 0);
                }

                // Delete documents in a batch
                var batch = db.batch();
                snapshot.docs.forEach(doc => {
                    batch.delete(doc.ref);
                });

                return batch.commit().then(() => {
                    return snapshot.size;
                });
            })
            .then(numDeleted => {
                if (numDeleted === 0) {
                    resolve();
                    return;
                }

                // Recurse on the next process tick, to avoid
                // exploding the stack.
                process.nextTick(() => {
                    deleteQueryBatch(query, batchSize, resolve, reject);
                });
            })
            .catch(reject);
    };
    deleteCollection(6);
});

module.exports = router;
