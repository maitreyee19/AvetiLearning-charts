var active_question_data = []
var student_data = []
var active_question_student_data = {
    "question_id": -1,
    "students": []
}

exports.reset_data = function () {
    student_data = [];
    active_question_data = [{
            Answer: "correct",
            Value: 0
        },
        {
            Answer: "wrong",
            Value: 0
        }
    ];
    console.log("data cleaned");
}

/**
 * called on deactivate to send data to teacher  and from teacher data will be pushed to db
 */
exports.get_question_student_data = function(){
    return active_question_student_data;
}

exports.reset_question_data = function () {
    active_question_data = [{
            Answer: "correct",
            Value: 0
        },
        {
            Answer: "wrong",
            Value: 0
        }
    ];
    console.log("Question data cleaned");

}

/**
 * called on deactivation to clear up the active_question_student_data  
 */
exports.reset_active_question_student_data = function () {
    active_question_student_data = {
        "question_id": -1,
        "students": []
    };
    console.log("Question student data cleaned");
}

exports.get_question_status = function () {
    return (active_question_data)
}

/**
 * remembers the current activate question
 * @param {string} question_id 
 */
exports.activate_question = function (question_id) {
    active_question_student_data.question_id = question_id;
    
}

/**
 * retruns the student data for the whole session to the teacher for the student leadership chart
 */
exports.get_student_status = function () {
    student_data.sort(function (a, b) {
        return b - a;
    })
    return (student_data.slice(0, 5))
}

/**
 * This gets called when student submits the data 
 * it does 3 things
 * 1 - add to the active_question_data wheather the answer is right or wrong
 * 2 - add the student details to active_question_student_data
 * 3 - stores cumulavtive student point for the session
 * @param {*} eventData 
 */
exports.update_student_data = function (eventData) {
    console.log("inside update sudent data")
    //add to the active_question_data wheather the answer is right or wrong
    var answer = active_question_data.find(function (answer) {
        return answer.Answer === eventData.answer;
    })
    if (answer) {
        answer.Value = answer.Value + 1;
    } else {
        active_question_data.push({
            "Answer": eventData.answer,
            "Value": 1
        })
    }
    // 2 - add the student details to active_question_student_data
    active_question_student_data.students.push({
        "answer": eventData.answer,
        "Name": eventData.Name,
        "Ph": eventData.Ph,
        "points": eventData.points
    });

    // 3 - stores cumulavtive student point for the session
    var student = student_data.find(function (student) {
        return student.name === eventData.Name;
    })
    if (student) {
        student.points = student.points + eventData.points;
    } else {
        student_data.push({
            "name": eventData.Name,
            "points": eventData.points
        })
    }
}

module.exports = exports;