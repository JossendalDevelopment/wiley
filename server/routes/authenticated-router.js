const express = require('express');
const db = require('../config/conn');
const Event = require('../types/Event.js');
const {
    getMetadataFile,
    writeMetadataFile,
    formatResponse,
} = require('../helpers');

var router = express.Router();

router.get('/authenticated', (req, res) => {
    res.json({ title: 'You have authenticated access' });
});

// unused. revisit on sprint 2 when events are received via live events
// router.post('/create_event', (req, res) => {
// TODO run this as a batch command
// const event = req.body.event;
// COLLECTION_REF.add(event)
//     .then(docRef => {
//         COLLECTION_REF.doc(docRef.id).update({
//             eventId: docRef.id,
//             timestamp: admin.firestore.FieldValue.serverTimestamp(),
//         });
//         formatResponse(res, 'success', docRef.id);
//     })
//     .catch(error => {
//         formatResponse(res, 'error', error);
//     });
// });

// @METHOD: POST
// @PARAMS: new event object
// @RETURNS: updated event object
router.post('/update_event_postgres', async (req, res) => {
    try {
        const event = new Event(req.body.event);

        // event.thumb_250x250 = Buffer.from(event.thumb_250x250.split(",")[1], 'base64');
        // console.log("THUMB", event.thumb_250x250);

        const writeResponse = await writeMetadataFile(event);
        console.log('WRITE RESPONSE', writeResponse);

        await db.none('UPDATE events SET user_classification = $1, classification_description = $2, modified_date = $3, thumb_250x250 = $4, classified_by = $5 WHERE id = $6',
            [
                event.user_classification,
                event.classification_description || null,
                new Date().toISOString(),
                event.thumb_250x250,
                event.classified_by,
                event.id
            ]);

        return formatResponse(res, 'success', event);
    } catch (error) {
        console.error('ERROR IN /update_event', error);
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: array of all events
router.get('/get_all_events_postgres', async (req, res) => {
    try {
        const response = await db.any('SELECT * FROM events;')
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: array of 50 unclassified events with priority on persons
router.get('/get_fifty_unclassified_events_postgres', async (req, res) => {
    try {
        const response = await db.any("SELECT * FROM events WHERE user_classification IS NULL ORDER BY inferenced_classification = 'person' DESC LIMIT 50;");
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: array of all events events with non null user_classificaiton field
router.get('/get_all_classified_events_postgres', async (req, res) => {
    try {
        const response = await db.any('SELECT * FROM events WHERE user_classification IS NOT NULL');
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: json array object
// pulls metadata.json file for given day, loads it into postgres container, and returns that json to client
router.get('/set_yesterdays_events_postgres', async (req, res) => {
    try {
        // this will return a json object of all events from metadata.json file
        const eventsJson = await getMetadataFile();
        console.log("EVENTS TO BE INSERTED TO DB", eventsJson.length)

        const response = await db.tx(t => {
            const queries = eventsJson.map(event => {
                // event.thumb_250x250 = null;
                return t.one('INSERT INTO events(id, image_filepath, image_filename, image_width, image_height, bbox_xmin, bbox_ymin, bbox_width, bbox_height, camera, inferenced_classification, inferenced_percentage, user_classification, classification_description, classified_by, modified_date, thumb_filename, thumb_filepath, thumb_250x250) VALUES(${id}, ${image_filepath}, ${image_filename}, ${image_width}, ${image_height}, ${bbox_xmin}, ${bbox_ymin}, ${bbox_width}, ${bbox_height}, ${camera}, ${inferenced_classification}, ${inferenced_percentage}, ${user_classification}, ${classification_description}, ${classified_by}, ${modified_date}, ${thumb_filename}, ${thumb_filepath}, ${thumb_250x250}) ON CONFLICT (id) DO UPDATE SET user_classification = null RETURNING id', new Event(event));
            });
            return t.batch(queries);
        });
        console.log("INSERT BATCH RESPONSE:", response)
        res.json(eventsJson);
    } catch (error) {
        console.error("ERROR SETTING EVENTS:", error);
        formatResponse(res, 'error', error);
    }
});

router.get('/get_count_by_type', async (req, res) => {
    try {
        const response = await db.any('SELECT user_classification, COUNT(*) AS count FROM events WHERE user_classification IS NOT NULL GROUP BY user_classification;');
        formatResponse(res, 'success', response);
    } catch (error) {
        console.error("ERROR GETTING EVENT COUNTS:", error);
        formatResponse(res, 'error', error);
    }
})

// @METHOD: DELETE
// @RETURNS: object of batch deletion data
router.get('/delete_events', async (req, res) => {
    // This will batch deletions of entire events table. Only used to support resetting data for demo use
    // OTHERWISE VERY DANGEROUS!!!!!!!!!!!!!!!

    try {
        await db.none('TRUNCATE events; DELETE FROM events;');
        formatResponse(res, 'success', "DELETE SUCCESSFUL");
    } catch (error) {
        console.error("ERROR DELETING EVENTS:", error);
        formatResponse(res, 'error', error);
    }
});

module.exports = router;
