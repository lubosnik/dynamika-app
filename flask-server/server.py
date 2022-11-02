from flask import Flask, request, json, make_response, jsonify

app = Flask(__name__)


@app.route("/matrices", methods=["GET"])
def matrices():
    if request.method == 'GET':
        return build_actual_response(jsonify({'name': 'Eric'}))


@app.route("/create", methods=["OPTIONS", "POST"])
def create():
    if request.method == 'OPTIONS':
        return build_preflight_response()
    elif request.method == 'POST':
        req = request.get_json()
        return build_actual_response(jsonify({'name': 'Ryso'}))


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
