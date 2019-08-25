const express = require('express');
const db = require('../config/conn');
const Event = require('../types/Event.js');
const {
    // getMetadataFile,
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
// router.get('/get_fifty_unclassified_events_postgres', async (req, res) => {
//     try {
//         const response = await db.any("SELECT * FROM events WHERE user_classification IS NULL ORDER BY inferenced_classification = 'person' DESC LIMIT 50;");
//         formatResponse(res, 'success', response);
//     } catch (error) {
//         formatResponse(res, 'error', error);
//     }
// });

// @METHOD: GET
// @RETURNS: array of all events events with non null user_classificaiton field
router.post('/get_archived_events_postgres', async (req, res) => {
    console.log("ARCHIVED PARAMS", req.body.params)
    let params = req.body.params;

    try {
        const response = await db.any(`SELECT * FROM events WHERE user_classification IS NOT NULL ORDER BY modified_date LIMIT ${params.limit}`);
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: array of all events events with non null user_classificaiton field
router.post('/get_archived_events_by_type_postgres', async (req, res) => {
    console.log("ARCHIVED PARAMS", req.body.params)
    let params = req.body.params;

    let query = '';
    if (params.filteredBy === 'today') {
        query = `SELECT * FROM events WHERE modified_date::date = CURRENT_DATE`
    } else if (params.filteredBy === 'current_week') {
        query = `SELECT * FROM events WHERE date_trunc('week', modified_date) = date_trunc('week',CURRENT_TIMESTAMP)`
    } else if (params.filteredBy === 'last_week') {
        query = `SELECT * from events 
                WHERE modified_date BETWEEN 
                NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 AND 
                NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER`
    } else {
        query = `SELECT * FROM events WHERE user_classification = $1 ORDER BY modified_date OFFSET $2 LIMIT $3`
    }
    // get yesterdays
    // select * from alerts where modified_date::date = current_date - 1;
    // get todays
    // select * from alerts where modified_date::date = current_date;
    // last week
    // select * from alerts WHERE modified_date BETWEEN
    // NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 
    // AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER;
    // current week
    //     SELECT * FROM alerts
    //   WHERE date_trunc('week', modified_date) = date_trunc('week',CURRENT_TIMESTAMP);



    try {
        const response = await db.any(query, [
            params.type,
            params.page * 20, // skip ahead 10 at a time
            params.limit
        ]);
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURN: 
router.get('/get_events_count', async (req, res) => {
    // sum(case when user_classification IS NOT NULL then 1 else 0 end) as Total
    try {
        const response = await db.any(`SELECT  
                sum(case when user_classification = 'animal' then 1 else 0 end) as Animal,
                sum(case when user_classification = 'intruder' then 1 else 0 end) as Intruder,
                sum(case when user_classification = 'train' then 1 else 0 end) as Train,
                sum(case when user_classification = 'employee' then 1 else 0 end) as Employee,
                sum(case when user_classification = 'false-alarm' then 1 else 0 end) as FasleAlarm
            from events;`
        );
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: json array object
// pulls metadata.json file for given day, loads it into postgres container, and returns that json to client
// router.get('/set_yesterdays_events_postgres', async (req, res) => {
//     try {
//         // this will return a json object of all events from metadata.json file
//         const eventsJson = await getMetadataFile();

//         const response = await db.tx(t => {
//             const queries = eventsJson.map(event => {

//                 return t.one('INSERT INTO events(bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_name) VALUES(${bbox_height}, ${bbox_width}, ${bbox_xmin}, ${bbox_ymin}, ${camera}, ${classification_description}, ${classified_by}, ${id}, ${image_filename}, ${image_filepath}, ${image_height}, ${image_width}, ${inferenced_classification}, ${inferenced_percentage}, ${modified_date}, ${thumb_filename}, ${thumb_filepath}, ${thumb_250x250}, ${thumb_height}, ${thumb_width}, ${user_classification}, ${video_clip_filepath}, ${video_clip_name}) ON CONFLICT (id) DO UPDATE SET user_classification = null RETURNING id', new Event(event));
//             });
//             return t.batch(queries);
//         });
//         console.log("INSERT BATCH RESPONSE:", response)
//         res.json(eventsJson);
//     } catch (error) {
//         console.error("ERROR SETTING EVENTS:", error);
//         formatResponse(res, 'error', error);
//     }
// });

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

// @METHOD: POST
// @RETURNS: array of all alerts with pagination
router.post('/get_alerts_postgres', async (req, res) => {
    console.log("ALERT PARAMS", req.body.params)
    let params = req.body.params;

    try {
        const response = await db.any(`SELECT * FROM alerts ORDER BY modified_date DESC OFFSET $1 LIMIT $2`, [
            params.page * 10, // skip ahead 20 at a time
            params.limit
        ]);
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: POST
// @PARAMS: new event object
// @RETURNS: updated event object
router.post('/update_alert_postgres', async (req, res) => {
    try {
        const event = new Event(req.body.event);

        const writeResponse = await writeMetadataFile(event);
        console.log('WRITE RESPONSE', writeResponse);

        // updates event
        await db.none('UPDATE alerts SET user_classification = $1, classification_description = $2, modified_date = $3, thumb_250x250 = $4, classified_by = $5 WHERE id = $6',
            [
                event.user_classification,
                event.classification_description || null,
                new Date().toISOString(),
                event.thumb_250x250,
                event.classified_by,
                event.id
            ]);

        // moves event from alerts to events table
        // const transferEvent = await db.one(`SELECT * FROM alerts WHERE id = $1`, [event.id])
        // console.log("TRANSFER", transferEvent)
        const transferEvent = await db.any(`
            INSERT INTO events(bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_name)
            SELECT bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_name
            FROM alerts
            WHERE id = $1
        `, [
                event.id
            ])
        await db.none(`DELETE FROM alerts WHERE id = $1`, [event.id])
        console.log("TRANSFER", transferEvent)

        return formatResponse(res, 'success', event);
    } catch (error) {
        console.error('ERROR IN /update_alert', error);
        formatResponse(res, 'error', error);
    }
});

module.exports = router;
