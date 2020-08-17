var active_question_data = [


]
var student_data = [
]

exports.reset_data = function () {
    student_data = [];
    active_question_data = [
        { Answer: "correct", Value: 0 },
        { Answer: "wrong", Value: 0 }
    ];
    console.log("data cleaned");
}

exports.reset_question_data = function () {

    active_question_data = [{ Answer: "correct", Value: 0 },
    { Answer: "wrong", Value: 0 }];
    console.log("Question data cleaned");
}

exports.get_question_status = function () {
    return (active_question_data)
}

exports.activate_question = function () {
    if (active_question_id < len(question_data) - 1) {
        active_question_id = active_question_id + 1
    } else {
        active_question_id = 0
    }
    active_question_data = question_data[active_question_id]["answers"]
    return (active_question_data)
}

exports.get_student_status = function () {
    student_data.sort(function (a, b) {
        return b - a;
    })
    return (student_data.slice(0, 5))
}

exports.update_student_data = function (eventData) {
    console.log("inside update sudent data")
    var answer = active_question_data.find(function (answer) {
        return answer.Answer === eventData.answer;
    })
    if (answer) {
        answer.Value = answer.Value + 1;
    } else {
        active_question_data.push(
            {
                "Answer": eventData.answer,
                "Value": 1
            }
        )
    }

    var student = student_data.find(function (student) {
        return student.name === eventData.student;
    })
    if (student) {
        student.points = student.points + eventData.points;
    } else {
        student_data.push(
            {
                "name": eventData.student,
                "points": eventData.points
            }
        )
    }
    // console.log(JSON.stringify(active_question_data));
    // console.log(JSON.stringify(student_data));
}

module.exports = exports;