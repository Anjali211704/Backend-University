from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():

    student = {
        "name": "Anjali",
        "branch": "CSE",
        "semester": 5
    }

    return render_template(
        "index.html",
        title="Jinja2 Server-Side Rendering",
        student=student
    )


if __name__ == "__main__":
    app.run(debug=True, port=5006)