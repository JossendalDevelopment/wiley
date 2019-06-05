const express = require('express');
const formatResponse = require('../helpers/format-response.js');
const admin = require('firebase-admin');

var router = express.Router();

const db = admin.firestore();
const COLLECTION_REF = db.collection('classified_events');

router.get('/authenticated', (req, res) => {
    res.json({ title: 'Please visit jossendal.com today' });
});

router.post('/create_event', (req, res) => {
    // TODO run this as a batch command
    const event = req.body.event;
    COLLECTION_REF.add(event)
        .then((docRef) => {
            COLLECTION_REF.doc(docRef.id).update({
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
    const event = req.body.event;
    COLLECTION_REF.doc(event.eventId).update({
        classifiedAs: event.classifiedAs,
        confirmationDescription: event.confirmationDescription,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        classified: true
    })
    .then(() => {
        formatResponse(res, 'success', event.id);
    })
    .catch((error) => {
        formatResponse(res, 'error', error);
    });
});

router.get('/get_all_events', (req, res) => {
    let result = [];
    COLLECTION_REF.get()
        .then(querySnapshot => {
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
        ).catch(error => {
            formatResponse(res, 'error', error);
        })
});

router.get('/get_all_classified_events', (req, res) => {
    let result = [];
    COLLECTION_REF.where("classified", "==", true).get()
    .then(
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
        ).catch(error => {
            formatResponse(res, 'error', error);
        })
});

router.post('/add_new_events', (req, res) => {
    const events = req.body.events;
    events.forEach(event => {
        let batch = db.batch();
        let newEventRef = COLLECTION_REF.doc();
        batch.set(newEventRef, event)
        batch.update(newEventRef, {eventId: newEventRef.id})
        batch.commit()
            .then(resp => {
                formatResponse(res, 'success', resp);
            })
            .catch((error) => {
                return error
                // formatResponse(res, 'error', error);
            })

    })
});

router.post('/delete_events', (req, res) => {
    // helper to clear firestore as a collection cannot be deleted and each document must be deleted indiviually
    // This will batch deletions. Only used to support resetting data for demo use
    // OTHERWISE VERY DANGEROUS!!!!!!!!!!!!!!!
    const deleteCollection = (batchSize) => {
        let query = COLLECTION_REF.limit(batchSize);
        return new Promise((resolve, reject) => {
            deleteQueryBatch(query, batchSize, resolve, reject);
        })
    };

    const deleteQueryBatch = (query, batchSize, resolve, reject) => {
        query.get()
          .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                formatResponse(res, 'success', 0);
            }
      
            // Delete documents in a batch
            var batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
      
            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
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
    }
    deleteCollection(6);
});

module.exports = router;