console.log("Hello World")
var activeQ = "",
    studentName = "",
    studentNumber = "",
    activeResult = false;

// var socket = io.connect('http://aveti-env.eba-hvgqzgcy.us-west-1.elasticbeanstalk.com', {
// reconnect: true,
// transports: ['websocket']
// });
var socket = io.connect('http://localhost:3000', {
    reconnect: true,
    transports: ['websocket']
});
socket.on('connect', function () {
    console.log
    socket.emit('event1', {
        data: 'I\'m connected!'
    });
});
socket.addEventListener('qevent', function (event) {
    console.log('Event from server ', event);
    if (event.status == 1) {
        activeQ = event.questionID
        $('#' + activeQ).addClass("aveti_a_active");
        $('#' + activeQ).removeClass("aveti_a_inactive");
        $(".question_ready").show();
        $(".aveti_question").hide();
        $(".result_status").hide();
    }
    if (event.status == 2) {
        activeQ = event.questionID

        initQ(activeQ);
        $(".question_ready").hide();
        $(".aveti_question").show();
        $(".result_status").hide();
    }
    if (event.status == 3) {
        $(".question_ready").hide();
        $(".aveti_question").hide();
        $(".result_status").show();
    }
    if (event.status == 4) {
        $(".question_ready").hide();
        $(".aveti_question").hide();
        $(".result_status").hide();
        $('#' + activeQ).addClass("aveti_a_inactive");
        $('#' + activeQ).removeClass("aveti_a_active");
    }
});

function updateResult() {
    var answer = $('#' + activeQ + " .aveit_input_a").val();
    console.log(answer)
    socket.emit('aevent', {
        "status": 1,
        "questionID": activeQ,
        "answer": answer,
        "student": studentName,
        "points": 10
    });
}

function keepStudentDetails() {
    studentName = $('#aveit_input_name').val();
    studentNumber = $('#aveit_input_number').val();
    $('#aveit_fill_details').hide();
    $('#aveit_show_details').text("Hello " + studentName);
}
