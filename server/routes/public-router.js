const express = require('express');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const admin = require('firebase-admin');

// const formatResponse = require('../helpers/format-response.js');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ title: 'Yep your server is running' });
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
