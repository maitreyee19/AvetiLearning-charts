const express = require('express');
const axios = require('axios');
const data = require('../data.js');
const { json } = require('express');
const router = express.Router();


router.post('/test', (req, res) => {
    console.log(" Got test call");
});
router.get('/reset_data', (req, res) => {
    data.reset_data();
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify('success'));
    }
})

router.get('/get_question_student_data', (req, res) => {
    var q_student_data = data.get_question_student_data();
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(q_student_data));
    }
})

router.get('/reset_question_data', (req, res) => {
    data.reset_question_data();
    data.reset_active_question_student_data();
    if (!res.headersSent) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify("success"));
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



router.get('/session_status', (req, res) => {
    // Access the provided 'page' and 'limt' query parameters
    console.log("inside get status status");
    try {
        let session_id = req.query.real_time_quiz_id;
        axios.get("http://odia.shikhya.org/RealTimeQuiz/real_time_summary_response?real_time_quiz_id" + session_id)
            .then(function (response) {
                console.log(response.data)
                if (!res.headersSent) {
                    res.writeHead(200, {
                        'content-type': 'application/json'
                    });
                    res.end(JSON.stringify(response.data));
                }
            });
    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.writeHead(500, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(err));
        }

    }

});

router.post('/question_response_toDB', (req, res) => {
    // Access the provided 'page' and 'limt' query parameters
    console.log("inside question_response_toDB");
    // console.log(JSON.stringify(req.body));
    try {
        axios.post('http://odia.shikhya.org/RealTimeQuiz/receive_question_response/', req.body)
        .then(function (response) {
            console.log(response.data)
            if (!res.headersSent) {
                res.writeHead(200, {
                    'content-type': 'application/json'
                });
                res.end(JSON.stringify(response.data));
            }
        });
    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.writeHead(500, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(err));
        }

    }

});
// app.get('/RealTimeQuiz/real_time_summary_response', function (request, response) {
//     let session_id = request.query.real_time_quiz_id;
//     console.log("session_id = " + session_id);
//     axios.get("http://odia.shikhya.org/RealTimeQuiz/real_time_summary_response")
//         .then(function (response) {
//             console.log(response)

//         });
// });

module.exports = router;