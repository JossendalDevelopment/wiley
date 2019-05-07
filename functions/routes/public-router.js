const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('config');
const formatResponse = require('../helpers/format-response.js');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ title: 'Please visit jossendal.com today' });
})

router.post('/login', (req, res) => {
    const token = jwt.sign({employeeId: req.body.eid}, config.get('jwt-secret'))

    formatResponse(res, 'success', { token: token });
});


module.exports = router;