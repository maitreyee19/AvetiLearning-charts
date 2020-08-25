import {
  drawBarChart,
  update_bar_chart,
  update_bar_chart_label,
  questions_bar_chart_svg,
  recreate_questions_barchart
} from './bar_chart.js';
import {
  draw_h_bar_chart,
  update_h_bar_chart,
  recreate_students_barchart,
  studends_bar_chart_svg
} from './h_bar_chart.js'

var session_id = "";
var nextQid = "";
var question_active = false;
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
  socket.emit('qevent', {
    "status": 1,
    "questionID": nextQid,
    "answer": "Tea"
  });
})

$("#aveti_q_set_session").click(function () {

  session_id = $(".aveti_q_url").val();
  $("#aveti_next_question").prop('disabled', false);
  $("#aveti_ready_question").prop('disabled', false)
  $("#aveti_activate_question").prop('disabled', false)
  $("#aveti_deactivate_question").prop('disabled', false)
})

$("#aveti_q_finish_session").click(function () {
  fetch('http://odia.shikhya.org/RealTimeQuiz/real_time_summary_response?real_time_quiz_id=' + session_id)
    .then(response => response.json())
    .then(response => {
      var json = response.data.students;
      var csv = "";
      var keys = (json[0] && Object.keys(json[0])) || [];
      csv += keys.join(',') + '\n';
      for (var line of json) {
        csv += '"' + keys.map(key => line[key]).join('","') + '"\n';
      }
      download("session_"+session_id + "summary.csv" , csv );
    })
})

$("#aveti_activate_question").click(function () {
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
})

$(".aveti_q_loadUrl").click(function () {
  fetch('/qna/reset_data')
    .then(response => response.json())
    .then(data => {
      start_question_status_chart();
      start_student_status_chart();
    })

})

$("#aveti_deactivate_question").click(function () {
  question_active = false;
  socket.emit('qevent', {
    "status": 3,
  });
  start_student_status_chart();
  fetch('/qna/get_question_student_data')
    .then(response => response.json())
    .then(data => {
      fetch('http://odia.shikhya.org/RealTimeQuiz/receive_question_response/', {
        method: 'post',
        body: JSON.stringify({
          "answer_json": data,
          "real_time_quiz_id": session_id
        })
      })
    })
})
$("#aveti_next_question").click(function () {
  fetch('/qna/reset_question_data')
    .then(response => response.json())
    .then(data => {
      drawBarChart(questions_bar_chart_svg, []);
      // start_student_status_chart();
    })


  socket.emit('qevent', {
    "status": 4
  });
})


var start_question_status_chart = function () {
  var x = 0;
  var intervalID = setInterval(function () {
    fetch('/qna/get_question_stats')
      .then(response => response.json())
      .then(data => {
        // console.log(" x = " + x);
        // console.log(" data = " + data);
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


function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}

