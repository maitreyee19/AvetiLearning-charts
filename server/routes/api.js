const express = require('express')
const data = require('../data.js')

const router = express.Router();

router.post('/test', (req, res) => {
    console.log(" Got test call");
});
router.get('/reset_data',(req, res) => {
    data.reset_data();
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify('success'));
    }
})


router.get('/get_question_stats', (req, res) => {
    // console.log(" Got test call");
    var stats = data.get_question_status();
    // console.log(stats);
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(stats));
    }
})

router.get('/get_student_stats', (req, res) => {
    // console.log(" Got test call");
    var stats = data.get_student_status();
    // console.log(stats);
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(stats));
    }
})

router.post('/answer', (req, res) => {
    console.log(stats);
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(stats));
    }
});
module.exports = router;