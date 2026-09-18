from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return "Flask API is running"


@app.route("/hello", methods=["GET"])
def hello():
    name = request.args.get("name", "Guest")

    return jsonify({
        "message": f"Hello {name}"
    })


@app.route("/student", methods=["POST"])
def student():
    data = request.get_json()

    return jsonify({
        "message": "Student data received",
        "student": data
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)