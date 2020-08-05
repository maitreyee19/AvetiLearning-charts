// var socket = io({
//     transports: ['websocket']
// });

var socket = io()
socket.on('connect', function () {
    socket.emit('event1', {
        data: 'I\'m connected!'
    });
});

fetch('/qna/test', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({"key" : "val"}),
})

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event);
});

socket.addEventListener('qnaevent', function (event) {
    console.log('Event from server ', event);
    if (event.status == 1) {
        $("#question_ready").show();
        $("#question_active").hide();
        $("#result_status").hide();
    }
    if (event.status == 2) {
        $("#question_ready").hide();
        $("#question_active").show();
        $("#result_status").hide();
    }
    if (event.status == 3) {
        $("#question_ready").hide();
        $("#question_active").hide();
        $("#result_status").show();
    }
    if (event.status == 4) {
        $("#question_ready").hide();
        $("#question_active").hide();
        $("#result_status").hide();
    }
});