const express = require('express')

const router = express.Router();

router.post('/test', (req, res) => {
    console.log(" Got test call");
});

module.exports = router;