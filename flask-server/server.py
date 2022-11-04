from flask import Flask, request, make_response, jsonify

from z1 import modelSolution
from modules.mojeZ1_input import input

app = Flask(__name__)


@app.route("/moje", methods=["GET"])
def get_response():
    if request.method == 'GET':
        return build_actual_response(jsonify(modelSolution(input)))


@app.route("/new", methods=["OPTIONS", "POST"])
def post_response():
    if request.method == 'OPTIONS':
        return build_preflight_response()
    elif request.method == 'POST':
        req = request.get_json()
        return build_actual_response(jsonify(modelSolution(req)))


def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True)
