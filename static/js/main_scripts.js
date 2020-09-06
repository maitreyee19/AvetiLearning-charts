import { drawBarChart, update_bar_chart_label, questions_bar_chart_svg, recreate_questions_barchart } from './bar_chart.js';
import { draw_h_bar_chart, recreate_students_barchart, studends_bar_chart_svg } from './h_bar_chart.js'

var session_id = "",
    question_count = 0,
    nextQid = -1,
    question_active = false;

var socket = io({
    transports: ['websocket']
});
socket.on('connect', function() {
    socket.emit('event1', {
        data: 'I\'m connected!'
    });
});



let activate_question = function() {
    question_active = true;
    socket.emit('qevent', {
        "status": 2,
        "questionID": nextQid,
        "question_link": $('.aveti_q_url').val()
    });
    $(".aveti_q_status_notactive").hide();
    $(".aveti_q_charts").show();
    recreate_questions_barchart();
    recreate_students_barchart();
    start_question_status_chart();
}

let reset_data = function() {
    fetch('/qna/reset_data')
        .then(response => response.json())
        .then(data => {
            start_question_status_chart();
            start_student_status_chart();
        })
}

let deactivate_question = function() {
    question_active = false;
    socket.emit('qevent', {
        "status": 3,
    });
    start_student_status_chart();
    fetch('/qna/get_question_student_data')
        .then(response => response.json())
        .then(data => {
            fetch('/qna/question_response_toDB', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "answer_json": data,
                    "real_time_quiz_id": session_id
                })
            })
        })
}

/**
 * Click event listeners
 */
$("#aveti_start_session").click(function() {

    session_id = $(".aveti_session_id").val();
    question_count = $(".aveti_no_questions").val();
    if (session_id === undefined || session_id === "" || question_count === undefined || question_count === 0) return;
    AvetiApp.questions = [];
    AvetiApp.isSessionActive = true;
    for (let iQst = 0; iQst < question_count; iQst++) {
        AvetiApp.questions.push(new Question(iQst));
    }
    $("#aveti_finish_session").prop('disabled', false);
    // $("#aveti_set_question").prop('disabled', false);
    // $("#aveti_ready_question").prop('disabled', false)
    // $("#aveti_activate_question").prop('disabled', false)
    // $("#aveti_deactivate_question").prop('disabled', false)
})

$("#aveti_finish_session").click(function() {
    fetch('/qna/session_status?real_time_quiz_id=' + session_id)
        .then(response => response.json())
        .then(response => {
            var json = response.data.students;
            var csv = "";
            var keys = (json[0] && Object.keys(json[0])) || [];
            csv += keys.join(',') + '\n';
            for (var line of json) {
                csv += '"' + keys.map(key => line[key]).join('","') + '"\n';
            }
            download("session_" + session_id + "summary.csv", csv);
        })
})
$('#aveti_set_question').click(function() {
    nextQid = $('#aveti_q_actions').data('qid');
    console.log("question id set to " + nextQid);
    // nextQid = $('#aveit_input_q').val();
    fetch('/qna/reset_question_data')
        .then(response => response.json())
        .then(data => {
            drawBarChart(questions_bar_chart_svg, []);
        })
    socket.emit('qevent', {
        "status": 4
    });
})
$('#aveti_ready_question').click(function() {
    socket.emit('qevent', {
        "status": 1,
        "questionID": nextQid,
        "answer": ""
    });
})


$("#aveti_activate_question").click(activate_question);
$(".aveti_q_loadUrl").click(reset_data);
$("#aveti_deactivate_question").click(deactivate_question);


/*************  required functions for event handlers */
/**
 * Start the question chart and redraw every 1 sec
 */
var start_question_status_chart = function() {
    var x = 0;
    var intervalID = setInterval(function() {
        fetch('/qna/get_question_stats')
            .then(response => response.json())
            .then(data => {
                if (x == 0) drawBarChart(questions_bar_chart_svg, data);
                else {
                    update_bar_chart_label(questions_bar_chart_svg, data)
                };
                if (++x >= 600 || question_active == false) {
                    window.clearInterval(intervalID);
                }
            })
            .catch(err => {
                console.log(err);
                if (++x === 5) {
                    window.clearInterval(intervalID);
                }
            });
    }, 1000);
}

/**
 * Generate the Student board chart
 */
var start_student_status_chart = function() {
    var x = 0;
    fetch('/qna/get_student_stats')
        .then(response => response.json())
        .then(student_data => {
            student_data.sort((a, b) => (a.Value > b.Value) ? -1 : 1)
            if (x == 0) draw_h_bar_chart(studends_bar_chart_svg, student_data);
            if (++x === 5) {
                window.clearInterval(intervalID);
            }
        })
        .catch(err => {
            console.log(err);
            if (++x === 5) {
                window.clearInterval(intervalID);
            }
        });
}

/**
 * Download the status json as csv file
 * @param {*} filename 
 * @param {*} text 
 */
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

class Question {
    constructor(qid) {
        this.qid = qid;
        this.isSelected = false;
        this.isActive = false;
        this.isReady = false;
    }
}

var AvetiApp = new Vue({
    el: '#Aveti-App',
    data: {
        isSessionActive: false,
        questions: [
            { qid: 0, isSelected: false, isReady: false, isActive: false },
            // { qid: 2, isSelected: false, isReady: false, isActive: false },
            // { qid: 3, isSelected: false, isReady: false, isActive: false }
        ]
    },
    methods: {
        setQuestion: function(question) {
            nextQid = question.qid;
            console.log("question id set to " + nextQid);
            question.isSelected = true;
            fetch('/qna/reset_question_data')
                .then(response => response.json())
                .then(data => {
                    drawBarChart(questions_bar_chart_svg, []);
                })
            socket.emit('qevent', {
                "status": 4
            });
        },
        readyQuestion: function(question) {
            question.isReady = true;
            socket.emit('qevent', {
                "status": 1,
                "questionID": nextQid,
                "answer": ""
            });
        },
        activateQuestion: function(question) {
            question.isActive = true;
            activate_question();
        },
        deactivateQuestion: function(question) {
            question.isActive = false;
            question.isReady = false;
            question.isSelected = false;
            deactivate_question();
        }

    }
})