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
// @RETURNS: array of all events events with non null user_classificaiton field
router.post('/get_archived_events_postgres', async (req, res) => {
    let params = req.body.params;

    try {
        const response = await db.any(`SELECT * FROM events WHERE user_classification IS NOT NULL ORDER BY modified_date LIMIT ${params.limit}`);
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: object with count prop<int> and events prop<array> of all events by type and filter
router.post('/get_archived_events_by_type_postgres', async (req, res) => {
    let params = req.body.params;

    let filterQuery = ''
    if (params.filteredBy === 'today') {
        filterQuery = `AND modified_date::date = CURRENT_DATE`
    } else if (params.filteredBy === 'current_week') {
        filterQuery = `AND date_trunc('week', modified_date) = date_trunc('week',CURRENT_TIMESTAMP)`
    } else if (params.filteredBy === 'last_week') {
        filterQuery = `AND modified_date BETWEEN 
            NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 AND 
            NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER`
    }

    const query = `SELECT * FROM events 
            WHERE user_classification = $1 
            ${filterQuery}
            ORDER BY modified_date DESC
            OFFSET $2 
            LIMIT $3`

    const countQuery = `SELECT COUNT(*) 
                        FROM events 
                        WHERE user_classification = $1
                        ${filterQuery}
                        `

    try {
        const events = await db.any(query, [
            params.type,
            +params.page * +params.limit,
            params.limit
        ]);
        const count = await db.any(countQuery, [
            params.type
        ]);

        const response = { count: count[0].count, events: events };

        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: object of objects with count of each type
router.get('/get_events_count', async (req, res) => {
    // sum(case when user_classification IS NOT NULL then 1 else 0 end) as Total
    try {
        const response = await db.any(`SELECT  
                sum(case when user_classification = 'employee' then 1 else 0 end) as employee,
                sum(case when user_classification = 'contractor' then 1 else 0 end) as contractor,
                sum(case when user_classification = 'intruder' then 1 else 0 end) as intruder,
                sum(case when user_classification = 'animal' then 1 else 0 end) as animal,
                sum(case when user_classification = 'train' then 1 else 0 end) as train,
                sum(case when user_classification = 'false-alarm' then 1 else 0 end) as "false-alarm"
            from events;`
        );
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: a count of all active alerts
router.get('/get_alerts_count', async (req, res) => {
    try {
        const response = await db.any(`SELECT COUNT(*) FROM alerts;`);
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: GET
// @RETURNS: 
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
// @PARAMS: page<int> , limit<int>
// @RETURNS: array of all alerts with pagination
router.post('/get_alerts_postgres', async (req, res) => {
    console.log("ALERT PARAMS", req.body.params)
    let params = req.body.params;

    try {
        const response = await db.any(`SELECT * FROM alerts ORDER BY modified_date DESC OFFSET $1 LIMIT $2`, [
            +params.page * +params.limit, // skip ahead <limit> at a time
            params.limit
        ]);
        formatResponse(res, 'success', response);
    } catch (error) {
        formatResponse(res, 'error', error);
    }
});

// @METHOD: POST
// @PARAMS: event object to be updated
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

        // moves event from alerts to events table minus the _id primary key
        const transferEvent = await db.any(`
            INSERT INTO events(bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_filename)
            SELECT bbox_height, bbox_width, bbox_xmin, bbox_ymin, camera, classification_description, classified_by, id, image_filename, image_filepath, image_height, image_width, inferenced_classification, inferenced_percentage, modified_date, thumb_filename, thumb_filepath, thumb_250x250, thumb_height, thumb_width, user_classification, video_clip_filepath, video_clip_filename
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
