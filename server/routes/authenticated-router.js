const express = require('express');
const admin = require('firebase-admin');
const formatResponse = require('../helpers/format-response.js');
const {
    getMetadataFile,
    writeMetadataFile,
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
        const writeResponse = await writeMetadataFile(event);
        console.log('WRITE UPDATES RESPONSE', writeResponse);
        if (writeResponse.status !== 200) {
            return formatResponse(res, 'error', writeResponse.message);
        }
        console.log("EVENT ID", event.eventId)
        await COLLECTION_REF.doc(event.eventId)
            .update({
                user_classification: event.user_classification,
                classification_description: event.classification_description,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                thumb_250x250: event.thumb_250x250 || null,
                classified_by: event.classified_by,
            })
        return formatResponse(res, 'success', event.id);
    } catch (error) {
        console.log('ERROR IN /update_event', error);
        formatResponse(res, 'update event error', error);
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
// @RETURNS: array of all events events with non null user_classificaiton field
router.get('/get_all_classified_events', (req, res) => {
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
    const hasAllKeys = obj => {
        const keys = [
            "bbox_height",
            "bbox_width",
            "bbox_xmin",
            "bbox_ymin",
            "camera",
            "classification_description",
            "classified_by",
            "eventId",
            "id",
            "image_filename",
            "image_filepath",
            "image_height",
            "image_width",
            "inferenced_classification",
            "inferenced_percentage",
            "modified_date",
            "thumb_filename",
            "thumb_filepath",
            "thumb_height",
            "thumb_width",
            "user_classification",
            "video_clip_filepath",
            "video_clip_name"
        ];
        return keys.every((item) => {
            return obj.hasOwnProperty(item);
        });
    };

    try {
        // this will return a json object of all events from metadata.json file
        const eventsJson = await getMetadataFile();

        console.log("RETRIEVED JSON DATA - SHOULD RETURN 50:", eventsJson.length)
        // load all events into the database
        eventsJson.forEach((event, idx) => {
            if (hasAllKeys(event)) {
                COLLECTION_REF.doc(event.id).set({
                    ...event,
                    eventId: event.id,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                })
            } else {
                console.log("JSON FAILED:", eventsJson[idx]);
            }
        });
        res.json(eventsJson);
    } catch (error) {
        console.log(" ERROR:", error);
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
