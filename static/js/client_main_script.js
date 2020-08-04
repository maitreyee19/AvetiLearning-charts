
var socket = io({transports: ['websocket']});
socket.on('connect', function() {
    socket.emit('event1', {data: 'I\'m connected!'});
});

socket.addEventListener('message', function (event) {
  console.log('Message from server ', event);
});

socket.addEventListener('qnaevent', function (event) {
  console.log('Event from server ', event);
  if(event.status == 1) $("#question_ready").show();
  if(event.status == 2) $("#question_active").show();
  if(event.status == 3) $("#result_status").show();
  if(event.status == 4) $("#question_deactivate").show();
});