
/**
 * By: Maitreyee
 * Sudent websocket listens to "qevents" and publishes "aevents"
 * qevents : - Status meaning  
 * 2- question ready
 * 3- question active 
 * 4- question deactive
 * 1- clear old data
 * 
 */

// var socket = io.connect('http://aveti-env.eba-hvgqzgcy.us-west-1.elasticbeanstalk.com', {
// reconnect: true,
// transports: ['websocket']
// });
var socket = io.connect('https://maitreyeedas.website/', {
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
        activeQ = event.questionID;
        $('#question_ready').show();
    }
    if (event.status == 2) {
        activeQ = event.questionID;
        $('#question_ready').hide();
        $('#perseus-container').show();
        $('#problem-and-answer').show();
        $('#scorer').prop('disabled', false)
        initQ(activeQ);
    }
    if (event.status == 3) {
        $('#perseus-container').hide();
        $('#problem-and-answer').hide();
    }
    if (event.status == 4) {
        $('#perseus-container').hide();
        $('#problem-and-answer').hide();
    }
});

