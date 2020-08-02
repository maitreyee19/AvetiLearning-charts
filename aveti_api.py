from flask import Flask,render_template
# from flask_api import status
from get_question_stats.lambda_function import lambda_handler as get_question_stats_lamdba
from get_questions_stats.lambda_function import lambda_handler as get_questions_stats_lamdba
from get_student_stats.lambda_function import lambda_handler as get_student_stats_lamdba
from activate_question.lambda_function import lambda_handler as activate_question_lamdba
app = Flask(__name__)



@app.route('/', methods=['GET'])
def welcome():
    return render_template('charts.html')

@app.route('/get_question_stats', methods=['GET'])
def get_question_stats():
    event = {}
    context = {}
    response = get_question_stats_lamdba(event,context)
    return {"response" : response}, 200


@app.route('/get_questions_stats', methods=['GET'])
def get_questions_stats():
    event = {}
    context = {}
    get_questions_stats_lamdba(event,context)
    return 'Hello, World!'

@app.route('/get_student_stats', methods=['GET'])
def get_student_stats():
    event = {}
    context = {}
    response = get_student_stats_lamdba(event,context)
    return {"response" : response}, 200


@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    event = {}
    context = {}
    response = get_student_stats_lamdba(event,context)
    return 'Hello, World!'


@app.route('/activate_question', methods=['PUT'])
def activate_question():
    event = {}
    context = {}
    response = activate_question_lamdba(event,context)
    return {"response" :response}, 200