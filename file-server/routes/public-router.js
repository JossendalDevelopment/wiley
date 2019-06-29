const express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ title: 'Please visit jossendal.com today' });
});

module.exports = router;
