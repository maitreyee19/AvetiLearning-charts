// var socket = io({
//     transports: ['websocket']
// });
var questionAnswers = [

]

var socket = io({
    transports: ['websocket']
  })
socket.on('connect', function () {
    socket.emit('event1', {
        data: 'I\'m connected!'
    });
});

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event);
});
function addSubmitEvent(){
$(".aveti_q_iframe").contents().find('button').on('click', ()=> {
    $(".aveti_q_iframe").contents().find('button').prop("disabled",true);
    var answer = $(".aveti_q_iframe").contents().find('input').val();
    console.log(answer)
    fetch('/qna/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"answer" : answer}),
    })
})
}


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
        $(".aveti_q_iframe").attr('src', event.question_link);
        $(".aveti_q_iframe").on("load",  addSubmitEvent);
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