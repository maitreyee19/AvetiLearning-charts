import {
  drawBarChart,
  update_bar_chart,
  questions_bar_chart_svg,
  recreate_questions_barchart
} from './bar_chart.js';
import {
  draw_h_bar_chart,
  update_h_bar_chart,
  studends_bar_chart_svg
} from './h_bar_chart.js'

var nextQid = "";
var socket = io({
  transports: ['websocket']
});
socket.on('connect', function () {
  socket.emit('event1', {
    data: 'I\'m connected!'
  });
});

$('#aveti_next_question').click(function () {
  nextQid = $('#aveit_input_q').val()
})
$('#aveti_ready_question').click(function () {
  socket.emit('qnaevent', {
    "status": 1,
    "questionID" : nextQid,
    "answer" : "Tea"
  });
})


$("#aveti_activate_question").click(function () {
  socket.emit('qnaevent', {
    "status": 2,
    "question_link": $('.aveti_q_url').val()
  });
  $(".aveti_q_status_notactive").hide();
  $(".aveti_q_charts").show();
  recreate_questions_barchart();
  start_question_status_chart();
})

$(".aveti_q_loadUrl").click(function () {
  $(".aveti_q_iframe").attr('src', $('.aveti_q_url').val());
})

$("#aveti_deactivate_question").click(function () {
  socket.emit('qnaevent', {
    "status": 3,
  });
  start_student_status_chart();
})
$("#aveti_next_question").click(function () {
  socket.emit('qnaevent', {
    "status": 4
  });
})



var start_question_status_chart = function () {
  var x = 0;
  var intervalID = setInterval(function () {
    fetch('/qna/get_question_stats')
      .then(response => response.json())
      .then(data => {
        if (x == 0) drawBarChart(questions_bar_chart_svg, data);
        update_bar_chart(questions_bar_chart_svg, data);
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
  }, 1000);
}


var start_student_status_chart = function () {
  var x = 0;
  // var intervalID = setInterval(function () {
    fetch('/qna/get_student_stats')
      .then(response => response.json())
      .then(student_data => {
        student_data.sort((a, b) => (a.Value > b.Value) ? -1 : 1)
        if (x == 0) draw_h_bar_chart(studends_bar_chart_svg, student_data);
        // update_h_bar_chart(studends_bar_chart_svg, student_data);
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
  // }, 1000);
}

// start_student_status_chart()
// start_question_status_chart()
// drawPieChart();