const express = require('express')

const router = express.Router();

router.post('/test', (req, res) => {
    console.log(" Got test call");
});

router.post('/answer', (req, res) => {
    console.log(" answer submitted");
});
module.exports = router;