
var question_data = [{
        "correctanswer": "India",
        "answers": [{
                "Answer": "Russia",
                "Value": 0
            },
            {
                "Answer": "India",
                "Value": 0
            },
            {
                "Answer": "USA",
                "Value": 0
            },
            {
                "Answer": "China",
                "Value": 0
            }
        ]
    },
    {
        "correctanswer": "Jajpur",
        "answers": [{
                "Answer": "cuttack",
                "Value": 0
            },
            {
                "Answer": "Jajpur",
                "Value": 0
            },
            {
                "Answer": "BBSR",
                "Value": 0
            },
            {
                "Answer": "Bari",
                "Value": 0
            }
        ]
    },
    {
        "correctanswer": "India",
        "answers": [{
                "Answer": "Odisha",
                "Value": 0
            },
            {
                "Answer": "AP",
                "Value": 0
            },
            {
                "Answer": "UP",
                "Value": 0
            },
            {
                "Answer": "Kerala",
                "Value": 0
            }
        ]
    }
]
var active_question_id = 0

var student_data = [{
        "Answer": "punu",
        "Value": 1030
    },
    {
        "Answer": "munu",
        "Value": 830
    },
    {
        "Answer": "tanu",
        "Value": 650
    },
    {
        "Answer": "chanu",
        "Value": 450
    },
    {
        "Answer": "ronu",
        "Value": 380
    },
    {
        "Answer": "banu",
        "Value": 670
    },
    {
        "Answer": "manu",
        "Value": 440
    },
    {
        "Answer": "sonu",
        "Value": 360
    },
    {
        "Answer": "kunu",
        "Value": 220
    }
]


exports.get_question_status = function() {
    active_question_data = question_data[active_question_id]["answers"]
    active_question_data[0]["Value"] = active_question_data[0]["Value"] + 1000
    active_question_data[1]["Value"] = active_question_data[1]["Value"] + 200
    active_question_data[2]["Value"] = active_question_data[2]["Value"] + 700
    active_question_data[3]["Value"] = active_question_data[3]["Value"] + 300
    return (active_question_data)
}

exports.activate_question = function() {
    if (active_question_id < len(question_data) - 1){
        active_question_id = active_question_id + 1
    }else {
        active_question_id = 0
    }
    active_question_data = question_data[active_question_id]["answers"]
    return (active_question_data)
}

exports.get_student_status = function() {
    student_data[0]["Value"] = student_data[0]["Value"] + 1000
    student_data[1]["Value"] = student_data[1]["Value"] + 200
    student_data[2]["Value"] = student_data[2]["Value"] + 700
    student_data[3]["Value"] = student_data[3]["Value"] + 300
    return (student_data)
}

module.exports = exports;